```rust

// Initialise Level
BEGIN levelSetup(level, player)
   start = level.start
   end = level.end
   
   player.pos = {x : start.x, y : start.y} // Scarred by pass by reference

   grav = level.grav

   platforms = []

   FOR i=0 TO length(level.platforms) STEP 1
      platform = level.platforms[i]

      // Draw a rectangle for the platform
      draw rectangle with upper-left corner: (platform.pos.x - (platform.width / 2), platform.pos.y - (platform.height/2)) and width: (platform.width), height: (platform.height) // Assuming that x is greater to the right, y is greater downwards
      
      append platform to platforms
   NEXT i

   return start, end, grav, platforms, player
END


BEGIN movement(player, grav)
   airDownAcc = (grav.x + grav.y) * 1.5
   jumpAcc = (grav.x + grav.y) * (-4) // Either the x or y component of gravity must be 0 (i.e. only up/down/left/right)
   jumpVel = jumpAcc * 1.5

   // Arbitrary numbers for the player's acceleration, inverted depending on gravity direction
   gravToValues = {
      "downGrav" : {airHorAcc : 0.3, groundHorAcc : 0.5, airHorDec : -0.2, groundHorDec : -0.2},
      "upGrav" : {airHorAcc : 0.3, groundHorAcc : 0.5, airHorDec : -0.2, groundHorDec : -0.2},
      "rightGrav" : {airHorAcc : -0.3, groundHorAcc : -0.5, airHorDec : 0.2, groundHorDec : 0.2}, 
      "leftGrav" : {airHorAcc : 0.3, groundHorAcc : 0.5, airHorDec : -0.2, groundHorDec : -0.2}
   } // Assuming x is greater to the right, y is greater downwards
   
   // Converting keystrokes to actual direction relative to gravity (i.e. assume that gravity is always pulling down, and determine what the other directions would become)
   keystrokeToDirection = {
      "downGrav" : {"up" : "up", "down" : "down", "left" : "left", "right" : "right"},
      "upGrav" : {"up" : "down", "down" : "up", "left" : "left", "right" : "right"},
      "rightGrav" : {"up" : "right", "down" : "left", "left" : "up", "right" : "down"},
      "leftGrav" : {"up" : "left", "down" : "right", "left" : "down", "right" : "up"}
   }

   WHILE player.alive == True
      player = physics(player) // See 'Physics Calculation'
      start, end, grav, platforms, player = checkStartEnd(player) // See 'Check Completion'
      start, end, grav, platforms, player = checkCollisions(player, platforms, level, grav, start, end) // See 'Check Collisions'

      get keystroke

      IF player.grav == True THEN // If player is able to change gravity
         IF keystroke == "W" THEN
            grav = {x : 0, y : -9.8} // Arbitrary numbers again
         ELSE IF keystroke == "S" THEN
            grav = {x : 0, y : 9.8}
         ELSE IF keystroke == "A" THEN
            grav = {x : -9.8, y : 0}
         ELSE IF keystroke == "D" THEN
            grav = {x : 9.8, y : 0}
         ENDIF
      ENDIF

      // Determining horizontal and vertical axis relative to gravity direction (assuming gravity direction is downwards)
      IF grav.y > 0 THEN
         gravDir = "downGrav"
         hor = "x"
         ver = "y"
      ELSE IF grav.y < 0 THEN
         gravDir = "upGrav"
         hor = "x"
         ver = "y"
      ELSE IF grav.x > 0 THEN
         gravDir = "rightGrav"
         hor = "y"
         ver = "x"
      ELSE IF grav.x < 0 THEN
      gravDir = "leftGrav"
         hor = "y"
         ver = "x"
      ENDIF
      
      
      direction = keystrokeToDirection[gravDir][keystroke]

      IF direction == "right" THEN
         IF player.airborne THEN
            player.acc[hor] = grav[gravDir].airHorAcc
         ELSE
            player.acc[hor] = grav[gravDir].groundHorAcc
         ENDIF
      ELSE
         IF player.airborne == True THEN
            player.acc[hor] = grav[gravDir].airHorDec
         ELSE
            player.acc[hor] = grav[gravDir].groundHorDec
         ENDIF
      ENDIF

      IF direction == "left" THEN
         IF player.airborne == True THEN
            player.acc[hor] = -grav[gravDir].airHorAcc
         ELSE
            player.acc[hor] = -grav[gravDir].groundHorAcc
         ENDIF
      ELSE
         IF player.airborne THEN
            player.acc[hor] = -grav[gravDir].airHorDec
         ELSE
            player.acc[hor] = -grav[gravDir].groundHorDec
         ENDIF
      ENDIF

      IF direction == "down" THEN
         IF player.airborne == True THEN
            player.acc[ver] = airDownAcc
         ENDIF
      ENDIF

      IF direction == "up" THEN
         IF player.airborne == False THEN
            player.acc[ver] = jumpAcc
            player.vel[ver] = jumpVel
         ENDIF
      ELSE
         player.acc[ver] = grav.x + grav.y
      ENDIF
   ENDWHILE

   return player
END



BEGIN updateVelocity(player) // as movement() has already updated acceleration (see 'Character Movement')
   player.vel.x += player.acc.x
   player.vel.y += player.acc.y

   IF player.vel.x > player.maxVel.x THEN
      player.vel.x = player.maxVel.x
   ENDIF
   IF player.vel.x < -player.maxVel.x THEN
      player.vel.x = -player.maxVel.x
   ENDIF
   IF player.vel.y > player.maxVel.y THEN
      player.vel.y = player.maxVel.y
   ENDIF
   IF player.vel.y < -player.maxVel.y THEN
      player.vel.y = -player.maxVel.y
   ENDIF
   
   return player
END

BEGIN updatePosition(player)
   player.pos.x += player.vel.x
   player.pos.y += player.vel.y

   draw rectangle of upper-left corner: (player.pos.x - (player.width/2), player.pos.y - (player.height/2)), width: (player.width), height: (player.height) // A rudimentary sprite of a player

   return player
END



BEGIN checkStartEnd(player, start, end, level)
      // Check if player has reached the start/end (offscreen on either up/down/left/right edge of screen) so that the player doesn't get moved to the previuos level from respawning
      IF (start.x - player.width/2 <= player.pos.x <= start.x + player.width/2) OR (start.y - player.height/2 <= player.pos.y <= start.y + player.height/2) THEN
         IF (player.pos.x >= width of viewport) OR (player.pos.x <= 0) OR (player.pos.y >= height of viewport) OR (player.pos.y <= 0) THEN
            return levelSetup(level.previous, player), player
         ENDIF
      ENDIF

      IF (end.x - player.width/2 <= player.pos.x <= end.x + player.width/2) OR (end.y - player.height/2 <= player.pos.y <= end.y + player.height/2) THEN
         IF (player.pos.x >= width of viewport) OR (player.pos.x <= 0) OR (player.pos.y >= height of viewport) OR (player.pos.y <= 0) THEN
            return levelSetup(level.next, player), player
         ENDIF
      ENDIF

      return start, end, grav, platforms, player
END


BEGIN checkCollisions(player, platforms, level, grav, start, end)
   player.airborne = True

   FOR i=0 TO length(platforms)
      platform = platforms[i]
      IF (platform.x - platform.width/2 <= player.pos.x <= platform.x + platform.width/2) THEN
         IF platform.y <= player.y <= platform.y + platform.height/2 THEN
         // Player under the platform
            IF player.vel.y < 0 THEN
               // Stop player from moving upwards only
               player.vel.y = 0
            ENDIF

            IF platform.type == "spike" THEN
               // Spikes kill player
               player.alive = False
               return levelSetup(level, player), player
               player.alive = True
               player = movement(player, grav)
            ENDIF

         ELSE IF platform.y - platform.height/2 <= player.y <= platform.y THEN
            // Player on top of platform
            IF player.vel.y > 0 THEN
               // Stop player from moving donwards only
               player.vel.y = 0
            ENDIF

            IF platform.type == "spike" THEN
               player.alive = False
               return levelSetup(level, player), player
               player.alive = True
               player = movement(player, grav)
            ENDIF
         ENDIF

      ELSE IF (platform.y - platform.height/2 <= player.pos.y <= platform.y + platform.height/2) THEN
         IF platform.x <= player.x <= platform.x + platform.width/2 THEN
         // Player to the right of platform
            IF player.vel.x < 0 THEN
               // Stop player from moving leftwards only
               player.vel.x = 0
            ENDIF

            IF platform.type == "spike" THEN
               player.alive = False
               return levelSetup(level, player), player
               player.alive = True
               player = movement(player, grav)
            ENDIF

         ELSE IF platform.x - platform.width/2 <= player.x <= platform.x THEN
            // Player to the left of platform
            IF player.vel.x > 0 THEN
               // Stop player from moving rightwards only
               player.vel.x = 0
            ENDIF

            IF platform.type == "spike" THEN
               player.alive = False
               return levelSetup(level, player), player
               player.alive = True
               player = movement(player, grav)
            ENDIF
      ENDIF
   NEXT i 

   return start, end, grav, platforms, player
END
```
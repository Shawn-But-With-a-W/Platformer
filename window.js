// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Collision = Matter.Collision,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    canvas : document.getElementById("game-screen"),
    engine : engine,
    options : {
        width : 1280, 
        height : 650, 
        background : "#c2c2c2", 
        pixelRatio : 'auto',
        wireframes : false,
        showAngleIndicator : true,
        showAxes : true,
        showBounds : true,
        showCollisions : true,
        showDebug : true,
        showIds : true,
        showPositions : true,
        showVelocity : true,
},});

// run the renderer
Render.run(render);
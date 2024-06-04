// Module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bounds = Matter.Bounds,
    Composite = Matter.Composite,
    Collision = Matter.Collision,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
    canvas : document.getElementById("game-screen"),
    engine : engine,
    options : {
        width : 1280, 
        height : 650, 
        background : "#b5b5b5", 
        pixelRatio : 'auto',
        wireframes : false,
        hasBounds : true,
        showDebug : true,
        showAngleIndicator : true,
        showAxes : true,
        showBounds : true,
        showCollisions : true,
        showIds : true,
        showPositions : true,
        showVelocity : true,
},});



// Run the renderer
Render.run(render);

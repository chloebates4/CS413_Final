var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

let texture = PIXI.Texture.from("assets/space.png");

play_sound(); 

function play_sound() {
    PIXI.sound.add('audio', 'audio.wav');
    PIXI.sound.play('audio', {loop: true});
}

loadMenu();

///////////////////////////////////////////////////////////////
////////////////////// SCREEN NAVIGATION //////////////////////
///////////////////////////////////////////////////////////////

/////////////// MENU SCREEN ///////////////
function loadMenu() {

    // Load Menu Screen
    let menu = new PIXI.Sprite(PIXI.Texture.from("assets/space_menu.png"));
    menu.width = renderer.screen.width;
    menu.height = renderer.screen.height;
    stage.addChild(menu);

    //BUTTON - play
    var playBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_play_space.png"));
    playBtn.position.x = 325;
    playBtn.position.y = 500;
    playBtn.interactive = true;
    playBtn.buttonMode = true;
    playBtn.on('pointerdown', loadGame);
    stage.addChild(playBtn);

    //BUTTON - credits
    var creditsBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_credits_space.png"));
    creditsBtn.position.x = 500;
    creditsBtn.position.y = 500;
    creditsBtn.buttonMode = true;
    creditsBtn.interactive = true;
    creditsBtn.buttonMode = true;
    creditsBtn.on('pointerdown', loadCredits);
    stage.addChild(creditsBtn);
}

// player sprite
let spaceship = new PIXI.Sprite(PIXI.Texture.from("assets/spaceship_blue.png"));
spaceship.position.x = (renderer.width/2);
spaceship.position.y = (renderer.height/2);

/////////////// GAME PLAY ///////////////
function loadGame() {

    // Load Game Screen
    let tilingSprite = new PIXI.extras.TilingSprite(texture, renderer.width, renderer.height);
    stage.addChild(tilingSprite);
    stage.scale.x = 3;
    stage.scale.y = 3;

    // add spaceship to middle
    stage.addChild(spaceship);

    // add planets and stars randomly
    scatterStars();
    scatterPlanets();

    update_camera();

}

/////////////// CREDITS SCREEN ///////////////
function loadCredits() {

    // Load Credits Screen
    let credits = new PIXI.Sprite(PIXI.Texture.from("assets/planet_background.png"));
    credits.width = renderer.screen.width;
    credits.height = renderer.screen.height;
    stage.addChild(credits);

    //BUTTON - menu
    var menuBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_home_space.png"));
    menuBtn.position.x = 720;
    menuBtn.position.y = 540;
    menuBtn.buttonMode = true;
    menuBtn.interactive = true;
    menuBtn.buttonMode = true;
    menuBtn.on('pointerdown', loadMenu);
    stage.addChild(menuBtn);

    //credit text
    let title_text = new PIXI.Text(
        'CREDITS',
        {fontFamily : "\"Roboto\",Roboto",
            fontSize: 45,
            fontWeight: "bold",
            fill : ["#7FFFD4"],
            align : 'center'});

    let credit_text = new PIXI.Text(
        'Design: Chloe Bates\n' +
        'Graphics: Chloe Bates\n' +
        'Game play: Chloe Bates\n' +
        'Sound: Chloe Bates\n' +
        'Code: Chloe Bates\n' +
        'Everything: Chloe Bates\n',
        {fontFamily : "\"Roboto\", Roboto, monospace",
            fontSize: 25,
            fontWeight: "bold",
            fill : ["#66CDAA"],
            align : 'center'});

    title_text.x = 320;
    title_text.y = 220;
    credit_text.x = 280;
    credit_text.y = 285;
    stage.addChild(title_text);
    stage.addChild(credit_text);
}


///////////////////////////////////////////////////////////////
/////////////////////////// EVENTS ////////////////////////////
///////////////////////////////////////////////////////////////

function keydownEventHandler(e) {
    if (e.keyCode == 87)
        spaceship.position.y -= 5;
    else if (e.keyCode == 83)
        spaceship.position.y += 5;
    else if (e.keyCode == 65)
        spaceship.position.x -= 5;
    else if (e.keyCode == 68)
        spaceship.position.x += 5;
    update_camera();

    for (var g in starsSprites) {
        var curr_star = starsSprites[g];

        if (collision_intersection(spaceship, curr_star)) {
            stage.removeChild(curr_star);
        }
        //There's no collision
    }

    console.log("--> SPACESHIP: " + spaceship.x + ", " + spaceship.y);
}

document.addEventListener("keydown", keydownEventHandler);

function animate() {

    requestAnimationFrame(animate);
    // render the root container
    renderer.render(stage);


/* DOESN'T WORK
    // Check intersection with gameport boundary:
    if (stage.x > 800) {
        spaceship.vx = -1 * Math.abs(spaceship.vx);
    }
    if (stage.x < 0) {
        spaceship.vx = Math.abs(spaceship.vx);
    }
    if (stage.y > 600) {
        spaceship.vy = -1 * Math.abs(spaceship.vy);
    }
    if (stage.y < 0) {
        spaceship.vy = Math.abs(spaceship.vy);
    }
*/
}

animate();

function collision_intersection(c0, c1) {
    // Use the radius to find the center of the circle:
    var c0xrad = c0.width/2;
    var c0yrad = c0.height/2;
    var c0x = c0.position.x + c0xrad;
    var c0y = c0.position.y + c0yrad;
    var c1x = c1.position.x ;
    var c1y = c1.position.y ;

    var x = Math.abs(c0x - c1x);
    var y = Math.abs(c0y - c1y);

    return (x <= 12 && y <= 20);
}

///////////////////////////////////////////////////////////////
////////////////////// HELPER FUNCTIONS ///////////////////////
///////////////////////////////////////////////////////////////
function update_camera() {
    stage.x = -spaceship.x * 3 + 800/2 - spaceship.width/2*3;
    stage.y = -spaceship.y * 3 + 600/2 + spaceship.height/2*3;
}

var stars = [
    "assets/star_green.png", "assets/star_green.png",
    "assets/star_pink.png", "assets/star_pink.png",
    "assets/star_yellow.png", "assets/star_yellow.png"
];

var starsSprites = [];

// add stars to game
function scatterStars() {

    for (i = 0; i < stars.length; i++) {

        // assign sprite to a png from the stars array
        var star = new PIXI.Sprite(PIXI.Texture.from(stars[i]));

        // "scatter" stars by randomly generating x,y coordinates
        var xValue = Math.floor(Math.random() * 800);
        var yValue = Math.floor(Math.random() * 600);

        star.width = 20;
        star.height = 20;
        star.position.x = xValue;
        star.position.y = yValue;
        stage.addChild(star);
        starsSprites.push(star);
        //starsSprites[i] = star;

        console.log("STAR: " + xValue + ", " + yValue);

    }
}

var planets = [
    "assets/planet_blue.png", "assets/planet_pink.png", "assets/planet_green.png",
    "assets/planet_blue.png", "assets/planet_pink.png", "assets/planet_green.png",
    "assets/saturn_green.png", "assets/saturn_purple.png", "assets/saturn_purple.png",
    "assets/saturn_green.png"
];
var planetsSprites = [];

// add planets to game
function scatterPlanets() {

    for (i = 0; i < planets.length; i++) {

        // assign sprite to a png from the planets array
        var planet = new PIXI.Sprite(PIXI.Texture.from(planets[i]));

        // "scatter" planets by randomly generating x,y coordinates
        var xValue = Math.floor(Math.random() * 1000) + 1;
        var yValue = Math.floor(Math.random() * 1000) + 1;

        planet.width = 100;
        planet.height = 100;
        planet.position.x = xValue;
        planet.position.y = yValue;
        stage.addChild(planet);
        planetsSprites[i] = planet;

    }
}

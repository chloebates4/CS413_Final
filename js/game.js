var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);
document.body.appendChild(renderer.view);

//var bump = new Bump();
var stage = new PIXI.Container();
let texture = PIXI.Texture.from("assets/space.png");

let menuBackground = new PIXI.Sprite(texture);

let spaceship = new PIXI.Sprite(PIXI.Texture.from("assets/spaceship_blue.png"));

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

loadMenu();


///////////////////////////////////////////////////////////////
////////////////////// SCREEN NAVIGATION //////////////////////
///////////////////////////////////////////////////////////////

var audio;
var sound;
//PIXI.sound.add('audio', 'audio.wav');
//PIXI.sound.play('audio');
/*
PIXI.sound.Sound.from
(
    {
        url: 'audio.mp3',
        autoPlay: true,
        loop: true
    }

);
*/
/////////////// MENU SCREEN ///////////////
function loadMenu() {
    let menu = new PIXI.Sprite(PIXI.Texture.from("assets/space_menu.png"));
    menu.width = renderer.screen.width;
    menu.height = renderer.screen.height;
    stage.addChild(menu);

    /*
    menuBackground.width = renderer.screen.width;
    menuBackground.height = renderer.screen.height;
    stage.addChild(menuBackground);
*/

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

    //SOUND
    //PIXI.load.add("audio.wav");
    //audio = PIXI.audioManager.getAudio("audio.mp3");
    //audio.play;
    //audio  = PIXI.sound.Sound.from('audio.mp3');
    //audio.volume = 0.33;
    //audio.play( { loop: true } );
    //sound = new PIXI.audio.Audio("audio.mp3");
    //sound = new PIXI.sound.from('audio.mp3');
    //sound.loop = true;
    //sound.play();
}

/////////////// GAME PLAY ///////////////
function loadGame() {

    let tilingSprite = new PIXI.extras.TilingSprite(texture, renderer.width, renderer.height);
    stage.addChild(tilingSprite);

    stage.scale.x = 3;
    stage.scale.y = 3;

    stage.addChild(spaceship);



    //BUTTON - quit
    /* Delete?
    var quitBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_quit_space.png"));
    quitBtn.position.x = 500;
    quitBtn.position.y = 410;
    quitBtn.interactive = true;
    quitBtn.buttonMode = true;
    quitBtn.on('pointerdown', loadMenu);
    stage.addChild(quitBtn);
     */

    scatterStars();
    scatterPlanets();

    spaceship.position.x = (renderer.width/2);
    spaceship.position.y = (renderer.height/2);

    update_camera();

}

/////////////// CREDITS SCREEN ///////////////
function loadCredits() {
    let credits = new PIXI.Sprite(PIXI.Texture.from("assets/planet_background.png"));
    credits.width = renderer.screen.width;
    credits.height = renderer.screen.height;
    stage.addChild(credits);

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
window.addEventListener("keydown", function (e) {

    if (e.keyCode == 87)
        spaceship.position.y -= 5;
    else if (e.keyCode == 83)
        spaceship.position.y += 5;
    else if (e.keyCode == 65)
        spaceship.position.x -=10;
    else if (e.keyCode == 68)
        spaceship.position.x +=10;
    update_camera();
    console.log(e.keyCode);
});


animate();

function animate() {
    //tilingSprite.tilePosition.x += 1;
    //tilingSprite.tilePosition.y += 1;

    bump.hit(spaceship, starsSprites, false, true, true,
        function (collision, platform) {
            stage.removeChild(platform);
        });

    spaceship.speed = 3;
    requestAnimationFrame(animate);
    // render the root container
    renderer.render(stage);
}

///////////////////////////////////////////////////////////////
////////////////////// HELPER FUNCTIONS ///////////////////////
///////////////////////////////////////////////////////////////
function update_camera() {
    stage.x = -spaceship.x * 3 + 800/2 - spaceship.width/2*3;
    stage.y = -spaceship.y * 3 + 600/2 + spaceship.height/2*3;
    // delete?
    //stage.x = -Math.max(0, Math.min(renderer.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
    //stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
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
        // delete?
        //var xValue = Math.floor(Math.random() * 750) + 1;
        //var yValue = Math.floor(Math.random() * 550) + 1;
        var xValue = Math.floor(Math.random() * 1000) + 1;
        var yValue = Math.floor(Math.random() * 1000) + 1;

        star.width = 20;
        star.height = 20;
        star.position.x = xValue;
        star.position.y = yValue;
        stage.addChild(star);
        starsSprites[i] = star;

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
        // delete?
        //var xValue = Math.floor(Math.random() * 750) + 1;
        //var yValue = Math.floor(Math.random() * 550) + 1;
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



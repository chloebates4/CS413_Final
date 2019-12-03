/*
Tools:
  - https://github.com/cursedcoder/awesome-pixijs
  - https://github.com/kittykatattack/learningPixi

Design Inspo:
  - https://www.shutterstock.com/search/pixel+solar+system

Bullet sprites: https://github.com/kittykatattack/spriteUtilities


pixijs shooting example: http://proclive.io/shooting-tutorial/
space game: https://github.com/JonathanHelvey/spaceGame/ant/master/main.js
Space shooting game: https://github.com/mazenmelouk/ShootEmUp/tree/master/src

TODO:
    - Search "Delete"
 */
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
let texture = PIXI.Texture.from("assets/space.png");

let menuBackground = new PIXI.Sprite(texture);

let spaceship = new PIXI.Sprite(PIXI.Texture.from("assets/spaceship_blue.png"));

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

loadMenu();


///////////////////////////////////////////////////////////////
////////////////////// SCREEN NAVIGATION //////////////////////
///////////////////////////////////////////////////////////////

/////////////// MENU SCREEN ///////////////
function loadMenu() {

    menuBackground.width = renderer.screen.width;
    menuBackground.height = renderer.screen.height;
    stage.addChild(menuBackground);

    //BUTTON - play
    var playBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_play_space.png"));
    playBtn.position.x = 100;
    playBtn.position.y = 400;
    playBtn.interactive = true;
    playBtn.buttonMode = true;
    playBtn.on('pointerdown', loadGame);
    stage.addChild(playBtn);

    //BUTTON - credits
    var creditsBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_credits_space.png"));
    creditsBtn.position.x = 500;
    creditsBtn.position.y = 410;
    creditsBtn.buttonMode = true;
    creditsBtn.interactive = true;
    creditsBtn.buttonMode = true;
    creditsBtn.on('pointerdown', loadCredits);
    stage.addChild(creditsBtn);


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

    spaceship.position.x = (renderer.width/2);
    spaceship.position.y = (renderer.height/2);

    update_camera();

}

/////////////// CREDITS SCREEN ///////////////
function loadCredits() {
    stage.addChild(menuBackground);

    var menuBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_home_space.png"));
    menuBtn.position.x = 500;
    menuBtn.position.y = 410;
    menuBtn.buttonMode = true;
    menuBtn.interactive = true;
    menuBtn.buttonMode = true;
    menuBtn.on('pointerdown', loadMenu);
    stage.addChild(menuBtn);
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
        //var xValue = Math.floor(Math.random() * 750) + 1;
        //var yValue = Math.floor(Math.random() * 550) + 1;
        var xValue = Math.floor(Math.random() * 1000) + 1;
        var yValue = Math.floor(Math.random() * 1000) + 1;

        star.width = 70;
        star.height = 70;
        star.position.x = xValue;
        star.position.y = yValue;
        stage.addChild(star);
        starsSprites[i] = star;

    }
}

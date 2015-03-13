

// create a new loader
loader = new PIXI.Loader();

loader.add('spritesheet','_assets/monsters.json');
// use callback
loader.once('complete',onAssetsLoaded);

// begin load
loader.load();

// holder to store aliens
var aliens = [];
var alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"];

var count = 0;

// create an new instance of a pixi stage
var stage = new PIXI.Container();

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(800, 600);

// add the renderer view element to the DOM
document.getElementById('example').appendChild(renderer.view);

// create an empty container
var alienContainer = new PIXI.DisplayObjectContainer();
alienContainer.position.x = 400;
alienContainer.position.y = 300;

// make the stage interactive
stage.interactive = true;

stage.addChild(alienContainer);

    function onAssetsLoaded()
    {
        // add a bunch of aliens with textures from image paths
        for (var i = 0; i < 100; i++)
        {
            var frameName = alienFrames[i % 4];

            // create an alien using the frame name..
            var alien = PIXI.Sprite.fromFrame(frameName);
            alien.tint = Math.random() * 0xFFFFFF;

            /*
             * fun fact for the day :)
             * another way of doing the above would be
             * var texture = PIXI.Texture.fromFrame(frameName);
             * var alien = new PIXI.Sprite(texture);
             */
            alien.position.x = Math.random() * 800 - 400;
            alien.position.y = Math.random() * 600 - 300;
            alien.anchor.x = 0.5;
            alien.anchor.y = 0.5;
            aliens.push(alien);
            alienContainer.addChild(alien);
        }

        // start animating
        requestAnimationFrame(animate);
    }

    stage.mousedown = stage.touchstart = function()
    {
        console.log('hi')
        alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;

//        feel free to play with what's below
//        var sprite = new PIXI.Sprite(alienContainer.generateTexture());
//        stage.addChild(sprite);
//        sprite.position.x = Math.random() * 800;
//        sprite.position.y = Math.random() * 600;
    }

    function animate() {
        // let's rotate the aliens a little bit
        for (var i = 0; i < 100; i++)
        {
            var alien = aliens[i];
            alien.rotation += 0.1;
        }

        count += 0.01;

        alienContainer.scale.x = Math.sin(count);
        alienContainer.scale.y = Math.sin(count);

        alienContainer.rotation += 0.01;

        // render the stage
        renderer.render(stage);

        requestAnimationFrame(animate);
    }
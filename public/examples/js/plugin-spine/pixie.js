const app = new PIXI.Application();
document.body.appendChild(app.view);

// load spine data
PIXI.Assets.load('examples/assets/pixi-spine/pixie.json').then(onAssetsLoaded);

function onAssetsLoaded(pixieAsset) {
    app.stage.interactive = true;
    let postition = 0;

    const background = PIXI.Sprite.from('examples/assets/pixi-spine/iP4_BGtile.jpg');
    const background2 = PIXI.Sprite.from('examples/assets/pixi-spine/iP4_BGtile.jpg');

    const foreground = PIXI.Sprite.from('examples/assets/pixi-spine/iP4_ground.png');
    const foreground2 = PIXI.Sprite.from('examples/assets/pixi-spine/iP4_ground.png');
    foreground.anchor.set(0, 0.7);
    foreground.position.y = app.screen.height;
    foreground2.anchor.set(0, 0.7);
    foreground2.position.y = app.screen.height;

    app.stage.addChild(background, background2, foreground, foreground2);

    const pixie = new PIXI.spine.Spine(pixieAsset.spineData);

    const scale = 0.3;

    pixie.x = 1024 / 3;
    pixie.y = 500;

    pixie.scale.x = pixie.scale.y = scale;

    app.stage.addChild(pixie);

    pixie.stateData.setMix('running', 'jump', 0.2);
    pixie.stateData.setMix('jump', 'running', 0.4);

    pixie.state.setAnimation(0, 'running', true);

    app.stage.on('pointerdown', onTouchStart);

    function onTouchStart() {
        pixie.state.setAnimation(0, 'jump', false);
        pixie.state.addAnimation(0, 'running', true, 0);
    }

    app.ticker.add(() => {
        postition += 10;

        background.x = -(postition * 0.6);
        background.x %= 1286 * 2;
        if (background.x < 0) {
            background.x += 1286 * 2;
        }
        background.x -= 1286;

        background2.x = -(postition * 0.6) + 1286;
        background2.x %= 1286 * 2;
        if (background2.x < 0) {
            background2.x += 1286 * 2;
        }
        background2.x -= 1286;

        foreground.x = -postition;
        foreground.x %= 1286 * 2;
        if (foreground.x < 0) {
            foreground.x += 1286 * 2;
        }
        foreground.x -= 1286;

        foreground2.x = -postition + 1286;
        foreground2.x %= 1286 * 2;
        if (foreground2.x < 0) {
            foreground2.x += 1286 * 2;
        }
        foreground2.x -= 1286;
    });
}

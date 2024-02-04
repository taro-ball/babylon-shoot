import * as GUI from '@babylonjs/gui';

export default class GameGUI {
    constructor(scene) {
        this.scene = scene;
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, this.scene);
        this._initGUI();
    }

    async _initGUI() {
        // ... all your GUI code ...
        // Remember to replace this.advancedTexture and this.scene
        // with the actual references passed in the constructor

        let loadedGUI = await this.advancedTexture.parseFromURLAsync("GUI/gui1.json");

        let sliderX = this.advancedTexture.getControlByName("RotationXSlider");
        sliderX.onValueChangedObservable.add((value) => {
            //console.log("advancedTexture!", this.advancedTexture);
            let testMesh = this.scene.getNodeByName("box1");
            testMesh.rotation.x = value / 50;
            testMesh.position.x = value / 50;

            // this.advancedTexture.isVisible = false;
            //loadedGUI.layer = -1
            //loadedGUI.dispose()
            // this.fastBulletBlueprint.diameter = value;
            //console.log(value);
        });

        let sliderY = this.advancedTexture.getControlByName("RotationYSlider");
        sliderY.onValueChangedObservable.add((value) => {
            //console.log("advancedTexture!", this.advancedTexture);
            let testMesh = this.scene.getNodeByName("box2");
            testMesh.rotation.y = value / 50;
            testMesh.position.y = value / 50;
        });

        //toggle GUI
        let advancedTexture0 = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const button = GUI.Button.CreateSimpleButton('myBtn', 'Menu');
        button.width = '80px';
        button.height = '30px';
        button.cornerRadius = '5';
        button.color = 'white';
        button.background = 'MidnightBlue';

        button.horizontalAlignment = "left"
        button.verticalAlignment = "top"

        advancedTexture0.addControl(button);

        let mainPanel = this.advancedTexture.getControlByName("Panel");
        mainPanel.isVisible = 0; //alpha = 0;

        button.onPointerUpObservable.add(function () {
            mainPanel.isVisible = mainPanel.isVisible === 1 ? 0 : 1;
        });
    }

    // Add other GUI-related methods here if needed
}
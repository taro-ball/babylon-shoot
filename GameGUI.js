import * as GUI from '@babylonjs/gui';

export default class GameGUI {
    constructor(scene) {
        this.scene = scene;
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, this.scene);
        this._initGUI();
    }

    async _initGUI() {

        let loadedGUI = await this.advancedTexture.parseFromURLAsync("gui1.json");

        let sliderX = this.advancedTexture.getControlByName("RotationXSlider");
        sliderX.onValueChangedObservable.add((value) => {
            //console.log("advancedTexture!", this.advancedTexture);
            let testMesh = this.scene.getNodeByName("box1");
                        testMesh.rotation.x = value / 50;
            testMesh.position.x = value / 50;
        });

        let sliderY = this.advancedTexture.getControlByName("RotationYSlider");
        sliderY.onValueChangedObservable.add((value) => {
            //console.log("advancedTexture!", this.advancedTexture);
            let testMesh = this.scene.getNodeByName("box2");
            testMesh.rotation.y = value / 50;
            testMesh.position.y = value / 50;
        });

        let sliderZ = this.advancedTexture.getControlByName("RotationZSlider");
        sliderY.onValueChangedObservable.add((value) => {
            let testMesh = this.scene.getS
        });


        let mainPanel = this.advancedTexture.getControlByName("Panel");
        mainPanel.isVisible = 0; //hide main pannel

        //toggle button
        //let advancedTexture0 = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const button = GUI.Button.CreateSimpleButton('myBtn', 'Menu');
        button.width = '80px';
        button.height = '30px';
        button.cornerRadius = '5';
        button.color = 'white';
        button.background = 'MidnightBlue';
        button.horizontalAlignment = "left"
        button.verticalAlignment = "top"

        this.advancedTexture.addControl(button);

        button.onPointerUpObservable.add(function () {
            mainPanel.isVisible = mainPanel.isVisible === 1 ? 0 : 1;
        });
    }
}
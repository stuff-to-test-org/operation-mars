/// <reference path="../../typings/requirejs/require.d.ts" />

namespace FallingShipAppConfig {

    export var baseAssetPath: string = "/Content/";

    export function init(assetPath) {
        baseAssetPath = assetPath;

        requirejs.config({
            //baseUrl: '../..',
            paths: {
                'jquery': '/Scripts/jquery-2.1.4.min',
                'phaser': '/Scripts/phaser.min'
            }
        });

        require(["FallingShipApp"]);
    }
}



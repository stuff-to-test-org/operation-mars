/// <reference path="../../typings/requirejs/require.d.ts" />

namespace FallingShipInit {

    export function init() {
        requirejs.config({
            //baseUrl: '../..',
            paths: {
                'jquery': '/Scripts/jquery-2.1.4.min',
                'phaser': '/Scripts/phaser/phaser.min'
            }
        });

        require(["FallingShipApp"]);
    }
}

// requirejs.config({
//     //baseUrl: '../..',
//     paths: {
//         'jquery': '/Scripts/jquery-2.1.4.min',
//         'phaser': '/Scripts/phaser/phaser.min'
//     }
// });
//
// require(["FallingShipApp"]);


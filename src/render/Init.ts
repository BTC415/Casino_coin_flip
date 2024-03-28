/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spine } from "pixi-spine";
import { loadSound } from "../utils"
import { VITE_API_ASSETS_IMAGE_URL } from "../utils/urls"
import { PIXI, appStage } from "./renderer"
import { Game_Global_Vars } from "../config";

const Init = async (res: any) => {
    console.log(res)
    appStage.removeChildren()
    loadSound()
    const bgCoinSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}sprites/coin-bg.png`))
    appStage.addChild(bgCoinSprite)

    bgCoinSprite.anchor.set(0.5)
    bgCoinSprite.position.set(500, 500)
    bgCoinSprite.scale.set(1.1)

    const spineCoin = appStage.addChild(new Spine(res.spine.spineData));
    spineCoin.position.set(500, 500);
    spineCoin.scale.set(1)
    spineCoin.state.timeScale = 0
    spineCoin.state.setAnimation(0, "HH", false);
    Game_Global_Vars.spineCoin = spineCoin

    spineCoin.state.addListener({
        complete: (entry) => {
            const trackIndex = entry.trackIndex;
            console.log(`Animation on track ${trackIndex} completed.`);
            Game_Global_Vars.onComplete()
        }
    });

}
export default Init
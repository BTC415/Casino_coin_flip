import * as PIXI from 'pixi.js';
import { config } from '../config';
import { animate } from './animate';
export { PIXI }
export const app = new PIXI.Application<HTMLCanvasElement>({
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
    autoStart: config.autoStart,
    antialias: config.antialias,
    resolution: config.resolution,
    backgroundAlpha: 0,
});
export const LoadingPIXIApp = new PIXI.Application<HTMLCanvasElement>({
    width: 300,
    height: 50,
    backgroundColor: config.backgroundColor,
    autoStart: config.autoStart,
    antialias: config.antialias,
    resolution: config.resolution,
    backgroundAlpha: 0,
});
export const appStage = new PIXI.Container()
app.stage.addChild(appStage)
app.ticker.add(animate);

export const LoadingPIXIAppStage = new PIXI.Container()
LoadingPIXIApp.stage.addChild(LoadingPIXIAppStage)
LoadingPIXIAppStage.scale.set(0.28)
import { Spine } from "pixi-spine";
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IConfig {
    width: number;
    height: number;
    backgroundColor: number | string;
    autoStart?: boolean;
    antialias?: boolean;
    transparent?: boolean;
    resolution?: number;
}
export type tweenType = {
    object: object,
    property: string,
    propertyBeginValue: number,
    target: number,
    time: number,
    easing: (t: number) => number,
    change: ((t: any) => Promise<void>) | null,
    complete: ((t: any) => Promise<void>) | null,
    start: number,
}

export type Game_Global_Vars_Type = {
    prev_toss: number,
    onComplete: () => void,
    spineCoin: Spine | null,
    stake: {
        max: number,
        min: number
    },
    running: boolean,
    wonRes: any,
    pf_hash: string,
    auto_flip_val: number,
    onLoadProgressChange: (p: number) => void
}
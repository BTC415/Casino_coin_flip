import { Game_Global_Vars_Type, IConfig, tweenType } from "../@types";
export const tweenings: tweenType[] = [];
export const config: IConfig = {
    width: 1000,
    height: 1000,
    backgroundColor: 0x00000000,
    autoStart: true,
    antialias: true,
    transparent: false,
    resolution: 1
};
export const Game_Global_Vars: Game_Global_Vars_Type = {
    prev_toss: 0,
    onComplete: () => { },
    spineCoin: null,
    stake: {
        max: 0,
        min: 0
    },
    running: false,
    wonRes: null,
    pf_hash: "",
    auto_flip_val: 0,
    onLoadProgressChange: () => { }
}
export const won_lose_coin_name = [["bitcoin", "ethereum"], ["ethereum", "bitcoin"]]
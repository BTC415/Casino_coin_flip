import { tweenings } from "../config";
import { lerp } from "../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const animate = () => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweenings.length; i++) {
        const t = tweenings[i];
        const phase = Math.min(1, (now - t.start) / t.time);
        (t.object as any)[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
            (t.object as any)[t.property] = t.target;
            if (t.complete) {
                t.complete(t)
            }
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++) {
        tweenings.splice(tweenings.indexOf(remove[i]), 1);
    }
};
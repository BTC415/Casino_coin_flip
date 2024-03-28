import { toast } from "react-toastify";
import { sound } from '@pixi/sound';
import { VITE_API_ASSETS_IMAGE_URL } from "./urls";

export function lerp(a1: number, a2: number, t: number) {
    return a1 * (1 - t) + a2 * t;
}

export const showToast = (msg: string) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
}
export const closeFullscreen = async () => {
    if (document.exitFullscreen) {
        try {
            await document.exitFullscreen();
        } catch {
            //
        }
    }
}

export const playSound = (type: 'bg' | 'flip' | 'win') => {
    let status = '';
    switch (type) {
        case 'bg':
            status = localStorage.getItem('music') || 'true'
            break;
        case 'flip':
        case 'win':
            status = localStorage.getItem('fx') || 'true'
            break;
    }
    if (status === 'true')
        sound.play(`${type}-sound`, { loop: type === 'bg' });
}
export const stopSound = (type: 'bg' | 'flip' | 'win') => {
    sound.stop(`${type}-sound`)
}

export const loadSound = () => {
    sound.add('bg-sound', `${VITE_API_ASSETS_IMAGE_URL}audio/bg-sound.mp3`);
    sound.add('flip-sound', `${VITE_API_ASSETS_IMAGE_URL}audio/flip.mp3`);
    sound.add('win-sound', `${VITE_API_ASSETS_IMAGE_URL}audio/win.mp3`);
    sound.volumeAll = 0.5

}
export const setVolume = (val: number) => {
    sound.volumeAll = val / 100
}

export const getUTCTimefromUTCTime: (timeString: string) => Date = (timeString: string) => {
    if (!timeString) return new Date()
    const modifiedTimeString = timeString.replace(' ', 'T');
    const date = new Date(modifiedTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    date.setHours(hours - 0);// ! Indian Server Time Zone GMT +5:30
    date.setMinutes(minutes - 0 - date.getTimezoneOffset());
    return date;
}
export function interpolate(x: number, x1: number, x2: number, y1: number, y2: number) {
    return Math.max(Math.min(y1, y2), Math.min(Math.max(y1, y2), (y2 - y1) * (x - x1) / (x2 - x1) + y1))
}

export const checkDevice = () => {
    let iPhone = false
    let mobile = false
    if (/Mobi/i.test(navigator.userAgent) || /Macintosh/i.test(navigator.userAgent)) {
        console.log("This is a mobile device");
        mobile = true
        if (/iPhone/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is an iPhone");
        } else if (/iPad/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is an iPad");
        } else if (/Macintosh/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is a Macintosh");
        }
    } else {
        console.log("This is a browser");
    }
    return { iPhone, mobile }
}

export const TIMESCALE = 1
export const webpORpng = "png" // PIXI.utils.isWebGLSupported() ? "webp" : "png"
export const mobileORdesktop = /Mobi/i.test(navigator.userAgent) ? "mobile" : "desktop"
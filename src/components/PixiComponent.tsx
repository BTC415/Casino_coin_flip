import { useEffect, useRef } from "react"
import { app, appStage } from "../render/renderer";
import { config } from "../config";

const PixiComponent = ({ show }: { show: boolean }) => {
    const ref = useRef<HTMLDivElement>(null)
    const handleResize = () => {
        setTimeout(() => {
            if (!ref.current) return
            const minH = Math.max(ref.current.clientHeight, window.innerWidth > 576 ? 150 : 200)
            app.renderer.resize(ref.current.clientWidth, minH)
            const APP_SCALE = Math.min(ref.current.clientWidth / config.width, minH / config.height)
            appStage.scale.set(APP_SCALE)
            appStage.position.set((ref.current.clientWidth - config.width * APP_SCALE) / 2, (minH - config.height * APP_SCALE) / 2)
        }, 100);
    };
    useEffect(() => {
        if (!ref.current) return
        ref.current.innerHTML = ""
        ref.current.appendChild(app.view)
    }, [ref])
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (show) window.dispatchEvent(new Event("resize"));
    }, [show])
    return (
        <div ref={ref} className="w-full h-full"></div>
    )
}
export default PixiComponent
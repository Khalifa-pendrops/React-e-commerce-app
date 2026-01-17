import { useEffect, useState } from "react";
import BurstBg from "./BurstBg";

const AppLoadBurst = ({ durationMs = 3500 }) => {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFading(true), Math.max(0, durationMs - 600));
        const hideTimer = setTimeout(() => setVisible(false), durationMs);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, [durationMs]);

    if (!visible) return null;

    return (
        <div className={`app-burst ${fading ? "app-burst--fade" : ""}`} aria-hidden="true">
            <BurstBg className="app-burst__canvas" density={900} />
        </div>
    );
};

export default AppLoadBurst;

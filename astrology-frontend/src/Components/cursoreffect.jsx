import { useEffect, useRef } from "react";

const CursorEffect = () => {
    const canvasRef = useRef(null);
    const tilaks = useRef([]);
    const tilakImg = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        tilakImg.current = new Image();
        tilakImg.current.src = "/images/cursor.png";

        const createTilak = (x, y) => {
            tilaks.current.push({
                x,
                y,
                opacity: 1,
                scale: 1,
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            tilaks.current.forEach((t, i) => {
                // 🔽 SIZE & SPEED CONTROLS
                t.opacity -= 0.01;     // fade speed
                t.scale += 0.001;      // grow speed

                if (t.opacity <= 0) {
                    tilaks.current.splice(i, 1);
                    return;
                }

                if (tilakImg.current.complete) {
                    // 🔽 FINAL SIZE HERE
                    const size = 30 * t.scale;

                    ctx.globalAlpha = t.opacity;

                    // 🔵 CIRCLE SHAPE CLIP
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, size / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();

                    ctx.drawImage(
                        tilakImg.current,
                        t.x - size / 2,
                        t.y - size / 2,
                        size,
                        size
                    );

                    ctx.restore();
                    ctx.globalAlpha = 1;
                }
            });

            requestAnimationFrame(animate);
        };

        const handleClick = (e) => {
            createTilak(e.clientX, e.clientY);
        };

        window.addEventListener("click", handleClick);
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
};

export default CursorEffect;

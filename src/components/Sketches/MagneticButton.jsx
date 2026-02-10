"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MagneticButton = () => {
    const ref = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const el = ref.current;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });

            if (textRef.current) {
                gsap.to(textRef.current, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            if (textRef.current) {
                gsap.to(textRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            }
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: '#1a1a1a',
                color: 'white',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <span ref={textRef} style={{ pointerEvents: 'none', fontWeight: 500 }}>
                Hover Me
            </span>
        </div>
    );
};

export default MagneticButton;

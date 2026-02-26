"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    // Create cursor elements
    const dot = document.createElement("div");
    dot.id = "dot";
    const ball = document.createElement("div");
    ball.id = "ball";
    document.body.appendChild(dot);
    document.body.appendChild(ball);

    gsap.set([dot, ball], { xPercent: -50, yPercent: -50 });

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "expo.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "expo.out" });
    const setBallX = gsap.quickTo(ball, "x", { duration: 0.35, ease: "expo.out" });
    const setBallY = gsap.quickTo(ball, "y", { duration: 0.35, ease: "expo.out" });

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setDotX(mouse.x);
      setDotY(mouse.y);
      setBallX(mouse.x);
      setBallY(mouse.y);
    };

    document.addEventListener("mousemove", handleMove);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      dot.remove();
      ball.remove();
    };
  }, []);

  return null;
}


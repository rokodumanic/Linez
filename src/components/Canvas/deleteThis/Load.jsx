import React from "react";
import remToPx from "../RemToPx";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const navHeight = document.getElementById("navbar").clientHeight;
  const yOffset = navHeight + remToPx(1);
  //Resizing
  canvas.height = window.innerHeight - yOffset;
  canvas.width = window.innerWidth;
  //line style
  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  //variables
  let painting = false;

  function startPosition(e) {
    painting = true;
    ctx.beginPath();
    draw(e);
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineTo(e.clientX, e.clientY - navHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY - navHeight);
  }
  //EventListener
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", () => (painting = false));
  canvas.addEventListener("mousemove", draw);
});

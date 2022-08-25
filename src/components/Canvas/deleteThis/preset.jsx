import React from "react";
import remToPx from "../RemToPx";
export function windowPresets(document, window) {
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
  console.log(ctx);
  return { canvas, ctx, navHeight };
}

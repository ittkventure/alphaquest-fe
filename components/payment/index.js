"use client"

import React from "react";
import Script from "next/script";

export default function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onLoad={() => {
        Paddle.Setup({
          vendor: Number(167184),
        });
      }}
    />
  );
}

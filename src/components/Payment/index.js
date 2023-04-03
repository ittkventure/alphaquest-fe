import React from "react";
import Script from "next/script";

export default function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onLoad={() => {
        if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
          Paddle.Environment.set(
            process.env.NEXT_PUBLIC_PADDLE_SANDBOX ?? "sandbox"
          );
        }
        Paddle.Setup({
          vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID ?? 11441),
        });
      }}
    />
  );
}

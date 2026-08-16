import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { z } from "zod";
import App from "./App";
import "./index.css";

export const comp01Schema = z.object({});

export type Comp01Props = z.infer<typeof comp01Schema>;

export const Comp01: React.FC<Comp01Props> = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 900], [1, 1.1], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black", opacity, transform: `scale(${scale})` }}>
      <App />
    </AbsoluteFill>
  );
};

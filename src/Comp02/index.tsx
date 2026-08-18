import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { z } from "zod";
import App from "./App";
import "./index.css";

export const comp01Schema = z.object({});

export type Comp01Props = z.infer<typeof comp01Schema>;

export const Comp01: React.FC<Comp01Props> = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 900], [1, 1.05], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(frame, [0, 15], [0.6, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#070709", opacity, transform: `scale(${scale})` }}>
      <App />
    </AbsoluteFill>
  );
};

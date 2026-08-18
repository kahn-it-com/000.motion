import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const comp04Schema = z.object({});

export type Comp04Props = z.infer<typeof comp04Schema>;

export const Comp04: React.FC<Comp04Props> = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  let backgroundColor = "white";
  if (frame >= 90 * fps) {
    backgroundColor = "red";
  } else if (frame >= 3 * fps) {
    backgroundColor = "black";
  }

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <Audio src={staticFile("mp3/2026B_Rev03_acousticDrums_003.mp3")} />
    </AbsoluteFill>
  );
};

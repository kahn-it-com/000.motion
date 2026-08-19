import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

export const comp04Schema = z.object({});

export type Comp04Props = z.infer<typeof comp04Schema>;

export const Comp04: React.FC<Comp04Props> = () => {
  const { durationInFrames, fps } = useVideoConfig();

  const threeSecondMark = 3 * fps;
  const ninetySecondMark = 90 * fps;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("mp3/2026B_Rev03_acousticDrums_003.mp3")} />

      <Sequence from={0} durationInFrames={threeSecondMark}>
        <AbsoluteFill style={{ backgroundColor: "white" }} />
      </Sequence>

      <Sequence from={threeSecondMark} durationInFrames={ninetySecondMark - threeSecondMark}>
        <AbsoluteFill style={{ backgroundColor: "black" }} />
      </Sequence>

      <Sequence from={ninetySecondMark} durationInFrames={durationInFrames - ninetySecondMark}>
        <AbsoluteFill style={{ backgroundColor: "red" }} />
      </Sequence>
    </AbsoluteFill>
  );
};

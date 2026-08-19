import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

export const comp07Schema = z.object({});

export type Comp07Props = z.infer<typeof comp07Schema>;

export const Comp07: React.FC<Comp07Props> = () => {
  const { durationInFrames, fps } = useVideoConfig();

  const threeSecondMark = 3 * fps;
  const ninetySecondMark = 90 * fps;
  const twoHundredSeventyOneSecondMark = 271 * fps;

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("mp3/2026B_Rev03_acousticDrums_003.mp3")}
        startFrom={twoHundredSeventyOneSecondMark}
      />

      <Sequence from={0} durationInFrames={threeSecondMark}>
        <AbsoluteFill style={{ backgroundColor: "yellow" }} />
      </Sequence>

      <Sequence from={threeSecondMark} durationInFrames={ninetySecondMark - threeSecondMark}>
        <AbsoluteFill style={{ backgroundColor: "green" }} />
      </Sequence>

      <Sequence from={ninetySecondMark} durationInFrames={Math.max(1, durationInFrames - ninetySecondMark)}>
        <AbsoluteFill style={{ backgroundColor: "red" }} />
      </Sequence>
    </AbsoluteFill>
  );
};

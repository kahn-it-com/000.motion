import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

export const comp06Schema = z.object({});

export type Comp06Props = z.infer<typeof comp06Schema>;

export const Comp06: React.FC<Comp06Props> = () => {
  const { durationInFrames, fps } = useVideoConfig();

  const threeSecondMark = 3 * fps;
  const ninetySecondMark = 90 * fps;
  const oneHundredEightyOneSecondMark = 181 * fps;

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("mp3/2026B_Rev03_acousticDrums_003.mp3")}
        startFrom={oneHundredEightyOneSecondMark}
      />

      <Sequence from={0} durationInFrames={threeSecondMark}>
        <AbsoluteFill style={{ backgroundColor: "yellow" }} />
      </Sequence>

      <Sequence from={threeSecondMark} durationInFrames={ninetySecondMark - threeSecondMark}>
        <AbsoluteFill style={{ backgroundColor: "green" }} />
      </Sequence>

      <Sequence from={ninetySecondMark} durationInFrames={durationInFrames - ninetySecondMark}>
        <AbsoluteFill style={{ backgroundColor: "red" }} />
      </Sequence>
    </AbsoluteFill>
  );
};

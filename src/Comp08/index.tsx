import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

export const comp08Schema = z.object({});

export type Comp08Props = z.infer<typeof comp08Schema>;

export const Comp08: React.FC<Comp08Props> = () => {
  const { durationInFrames, fps } = useVideoConfig();

  const threeSecondMark = 3 * fps;
  const ninetySecondMark = 90 * fps;
  const threeHundredSixtyOneSecondMark = 361 * fps;

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("mp3/2026B_Rev03_acousticDrums_003.mp3")}
        startFrom={threeHundredSixtyOneSecondMark}
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

import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

export const comp05Schema = z.object({});

export type Comp05Props = z.infer<typeof comp05Schema>;

export const Comp05: React.FC<Comp05Props> = () => {
  const { durationInFrames, fps } = useVideoConfig();

  const threeSecondMark = 3 * fps;
  const ninetySecondMark = 90 * fps;
  const ninetyOneSecondMark = 91 * fps;

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("mp3/2026B_Rev03_acousticDrums_003.mp3")}
        startFrom={ninetyOneSecondMark}
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

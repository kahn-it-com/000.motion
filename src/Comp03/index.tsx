import React from "react";
import { AbsoluteFill, Audio, Loop, Series, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";

import { FadeIn } from "../Comp00/FadeIn";
import { Toon } from "../Comp00/Toon";

export const comp00Schema = z.object({
  titleText: z.string(),
  titleColor: z.string(),
});

export type Comp00Props = z.infer<typeof comp00Schema>;

export const Comp00: React.FC<Comp00Props> = () => {
  const { durationInFrames, fps } = useVideoConfig();
  const secondSeqDuration = Math.max(1, durationInFrames - 100);

  // 30.4s clip duration = 912 frames at 30 fps
  const audioDurationInFrames = Math.round(30.4 * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Loop durationInFrames={audioDurationInFrames}>
        <Audio src={staticFile("wav/000.wav")} />
      </Loop>
      <Series>
        <Series.Sequence durationInFrames={100}>
          <AbsoluteFill style={{ backgroundColor: "white" }}>
            <FadeIn />
          </AbsoluteFill>
        </Series.Sequence>

        <Series.Sequence durationInFrames={secondSeqDuration}>
          <AbsoluteFill style={{ backgroundColor: "white" }}>
            <Loop durationInFrames={50}>
              <Toon />
            </Loop>
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

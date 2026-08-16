import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";

export const comp00Schema = z.object({
  titleText: z.string(),
  titleColor: z.string(),
});

export type Comp01Props = z.infer<typeof comp00Schema>;

export const Comp01: React.FC<Comp01Props> = () => {



  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
   
    </AbsoluteFill>
  );
};

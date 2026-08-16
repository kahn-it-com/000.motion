import { Img, staticFile, useCurrentFrame } from "remotion";

export function Toon() {
  function pad(num: number, size: number) {
    return String(num).padStart(size, "0");
  }

  const frame = useCurrentFrame();

  const max = 121;

  const imageIndex = Math.floor(frame % max);

  const now = pad(imageIndex, 5);

  return (
    <div>
      <Img src={staticFile(`/test000/Head rig.${now}.png`)} />
    </div>
  );
}

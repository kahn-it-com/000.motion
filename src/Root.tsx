import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { Comp00, comp00Schema } from "./Comp00";
import { Comp01, comp01Schema } from "./Comp01";
import { Comp04, comp04Schema } from "./Comp04";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Comp00"
        component={Comp00}
        durationInFrames={1800}
        fps={30}
        width={1280}
        height={720}
        schema={comp00Schema}
        defaultProps={{
          titleText: "Now I tell you",
          titleColor: "#000000",
        }}
      />
      <Composition
        id="Comp01"
        component={Comp01}
        durationInFrames={900}
        fps={30}
        width={1280}
        height={720}
        schema={comp01Schema}
        defaultProps={{}}
      />

      <Composition
        id="Comp04"
        component={Comp04}
        durationInFrames={10403}
        fps={30}
        width={1280}
        height={720}
        schema={comp04Schema}
        defaultProps={{}}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};

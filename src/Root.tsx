import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { Comp00, comp00Schema } from "./Comp00";
import { Comp01, comp01Schema } from "./Comp01";
import { Comp04, comp04Schema } from "./Comp04";
import { Comp05, comp05Schema } from "./Comp05";
import { Comp06, comp06Schema } from "./Comp06";
import { Comp07, comp07Schema } from "./Comp07";
import { Comp08, comp08Schema } from "./Comp08";

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
        durationInFrames={Math.round(346.752 * 30)}
        fps={30}
        width={720}
        height={1280}
        schema={comp04Schema}
        defaultProps={{}}
      />
      <Composition
        id="Comp05"
        component={Comp05}
        durationInFrames={Math.round((346.752 - 91) * 30)}
        fps={30}
        width={720}
        height={1280}
        schema={comp05Schema}
        defaultProps={{}}
      />
      <Composition
        id="Comp06"
        component={Comp06}
        durationInFrames={Math.round((346.752 - 181) * 30)}
        fps={30}
        width={720}
        height={1280}
        schema={comp06Schema}
        defaultProps={{}}
      />
      <Composition
        id="Comp07"
        component={Comp07}
        durationInFrames={Math.max(Math.round(90 * 30), Math.round((346.752 - 271) * 30))}
        fps={30}
        width={720}
        height={1280}
        schema={comp07Schema}
        defaultProps={{}}
      />
      <Composition
        id="Comp08"
        component={Comp08}
        durationInFrames={Math.max(Math.round(90 * 30), Math.round((346.752 - 361) * 30))}
        fps={30}
        width={720}
        height={1280}
        schema={comp08Schema}
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

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
 
// The composition you want to render
const compositionId = "MyComp";
 
// You only have to create a bundle once, and you may reuse it
const bundleLocation = await bundle({
  entryPoint: path.resolve("./src/index"),
  // If you have a Webpack override, make sure to add it here
  webpackOverride: (config) => config,
});
 
// Parametrize the video by passing arbitrary props to your component.
const inputProps = {
  foo: "bar",
};
 
// Get the composition you want to render. Pass inputProps if you want to customize the
// duration or other metadata.
const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: compositionId,
  inputProps,
});
 
// Render the video
await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: "h264",
  outputLocation: `out/${compositionId}.mp4`,
  inputProps,
});
 
console.log("Render done!");
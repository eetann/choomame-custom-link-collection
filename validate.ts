declare global {
  // eslint-disable-next-line no-unused-vars
  interface ImportMeta {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env: any;
  }
}

import JSON5 from "json5";
import path from "path";
import { readdirSync, readFileSync } from "fs";
import { customLinkFetchJsonSchema } from "./choomame/src/features/customLink/customLinkSchema.js";

readdirSync("./src").forEach((file) => {
  if (file.endsWith(".json5")) {
    const filepath = path.join("./src", file);
    const data = JSON5.parse(readFileSync(filepath, "utf8"));
    const parseResult = customLinkFetchJsonSchema.safeParse(data);
    if (parseResult.success === false) {
      console.error(parseResult.error.issues);
      throw new Error("Parsing failed. Please check the schema.");
    }
  }
});

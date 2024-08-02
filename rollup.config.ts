import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import { generateDtsBundle } from "rollup-plugin-dts-bundle-generator";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm"
    },
    plugins: [
      typescript(),
      commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: ["./index.js", "node_modules/**"], // Default: undefined

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false, // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: false // Default: true
      }),
      nodeResolve({
        modulesOnly: false
      }),
      generateDtsBundle({
        entry: [{ filePath: "src/index.ts" }]
      })
    ]
  },
  {
    input: "src/angular/index.ts",
    output: {
      dir: "dist/angular",
      format: "esm"
    },
    plugins: [
      typescript(),
      generateDtsBundle({
        entry: [{ filePath: "src/angular/index.ts" }]
      })
    ]
  },
  {
    input: "src/react/index.ts",
    output: {
      dir: "dist/react",
      format: "esm"
    },
    plugins: [
      typescript(),
      generateDtsBundle({
        entry: [{ filePath: "src/react/index.ts" }]
      })
    ]
  },
  {
    input: "src/lit/index.ts",
    output: {
      dir: "dist/lit",
      format: "esm"
    },
    plugins: [
      typescript(),
      generateDtsBundle({
        entry: [{ filePath: "src/lit/index.ts" }]
      })
    ]
  },
  {
    input: "src/assertable.ts",
    output: {
      format: "esm",
      file: "dist/assertable/index.js"
    },
    plugins: [
      typescript(),
      generateDtsBundle({
        entry: [{ filePath: "src/assertable.ts" }]
      })
    ]
  }
];

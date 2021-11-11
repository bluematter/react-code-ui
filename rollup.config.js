import babel from "rollup-plugin-babel";
import ts from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import css from "rollup-plugin-import-css";
import pkg from "./package.json";

const PLUGINS = [
  css(),
  ts({
    tsconfigOverride: { exclude: ["**/*.test.ts"] },
  }),
  babel({
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    presets: ['@babel/env', '@babel/preset-react']
  }),
  replace({
    _VERSION: JSON.stringify(pkg.version),
  }),
];

export default [
  {
    input: "src/index.tsx",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: PLUGINS,
  }
];

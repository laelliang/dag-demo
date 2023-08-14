import commonjs from 'rollup-plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts', // 入口文件路径
  output: {
    // strict: false, //禁止严格模式
    file: 'dist/index.js', // 输出文件路径
    format: 'iife', // 输出文件格式
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    nodeResolve(),// 支持node_modules
    commonjs()// 支持module
  ]
};

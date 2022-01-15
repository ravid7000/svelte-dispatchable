import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import bundleSize from 'rollup-plugin-bundle-size'
import { terser } from 'rollup-plugin-terser'

const input = 'src/dispatchable.ts'

const outputs = [
  {
    sourcemap: false,
    format: 'cjs',
    name: 'Dispatchable',
    file: 'build/dispatchable.js',
    exports: 'auto',
  },
]

const plugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  typescript(),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  terser({
    format: {
      comments: false,
    },
  }),

  bundleSize(),
]

const config = outputs.map((output, index) => {
  return {
    input,
    output,
    plugins,
  }
})

export default config

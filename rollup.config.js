import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import globals from 'rollup-plugin-node-globals';
import {terser} from 'rollup-plugin-terser';

import {babel} from '@rollup/plugin-babel';

const commonPlugins = [
  commonjs(),
  globals(),
  nodePolyfills(),
  nodeResolve({
    browser: true,
  }),
  babel({
    presets: ['@babel/preset-env'],
    babelHelpers: 'bundled',
  }),
];

const config = {
  input: 'src/morpher.js',
  output: [
    {
      file: 'dist/morpher.min.js',
      format: 'umd',
      sourcemap: true,
      name: 'Morpher',
      plugins: terser(),
    }, {
      file: 'dist/morpher.js',
      format: 'umd',
      sourcemap: true,
      name: 'Morpher',
    },
  ],
  plugins: commonPlugins,
};

export default config;
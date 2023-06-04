import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import dts from "rollup-plugin-dts";
import { globSync } from 'glob'

const config = [
  {
    input: 'src/aimless.js',
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/preset-env', {
              modules: false,
              targets: {
                browsers: ['last 2 versions']
              }
            }
          ]
        ],
        plugins: [
          "@babel/plugin-proposal-object-rest-spread"
        ]
      })
    ],
    output: [
      {
        file: 'dist/aimless.js',
        format: 'umd',
        name: 'aimless'
      }, {
        file: 'dist/aimless.module.js',
        format: 'es'
      }
    ]
  },
  {
    input: 'types/aimless.d.ts',
    output: { file: 'dist/aimless.d.ts', format: 'es' },
    plugins: [dts()]
  }
]

export default config

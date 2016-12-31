'use strict'

var json = require('rollup-plugin-json')
var buble = require('rollup-plugin-buble')
var commonjs = require('rollup-plugin-commonjs')
var nodeResolve = require('rollup-plugin-node-resolve')

module.exports = {
  entry: './index',
  dest: './lib/index.js',
  format: 'cjs',
  plugins: [json(), commonjs(), nodeResolve({
    preferBuiltins: true,
    jsnext: true
  }), buble({
    target: {
      node: '4'
    }
  })]
}

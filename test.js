/*!
 * start-jstransformer <https://github.com/tunnckoCore/start-jstransformer>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const startJstransformer = require('./lib/index')

test('start-jstransformer', (done) => {
  var file = {
    path: 'fake.tpl',
    data: 'Hello #{place} and #{user.name}!'
  }

  startJstransformer({
    engine: require('jstransformer-j140'),
    locals: {
      author: 'YEAHHHHH',
      place: 'world',
      user: {
        name: 'Charlike'
      }
    }
  /* './charlike/templates/LICENSE' */
  })([file])(() => {}).then((file) => {
    console.log(file)
    done()
  }, done)
})

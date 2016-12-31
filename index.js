/*!
 * start-jstransformer <https://github.com/tunnckoCore/start-jstransformer>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

import extend from 'extend-shallow'
import JSTransformer from 'jstransformer'
import jstransformer from 'jstransformer-jstransformer'

const transform = JSTransformer(jstransformer)

export default (config) => (input) => {
  return function jstransformer (log) {
    return Promise.all(input.map((file) => {
      return new Promise((resolve, reject) => {
        config = extend({}, config)
        if (typeof file === 'string') {
          transform.renderFileAsync(file, config, config.locals)
            .then((result) => {
              resolve({
                path: file,
                data: result.body
              })
            })
            .catch(reject)
          return
        }
        transform.renderAsync(file.data, config, config.locals)
          .then((result) => {
            file.data = result.body
            resolve(file)
          })
          .catch(reject)
      })
    }))
  }
}

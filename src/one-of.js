import { intRange } from './int-range.js'
import { defaultEngine } from './utils.js'

/**
 * Returns a random value from the provided array
 * @param {*[]} arr Array of values
 * @param {() => number} engine PRNG of choice
 * @returns {*}
 */
const oneOf = (arr, engine = defaultEngine) => {
  return arr[intRange(0, arr.length - 1, engine)]
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(arr: *[]) => *}
 */
const oneOfWithEngine = (engine = defaultEngine) => {
  return (arr) => oneOf(arr, engine)
}

export {
  oneOf,
  oneOfWithEngine
}

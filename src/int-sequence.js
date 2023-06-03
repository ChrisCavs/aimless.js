import { defaultEngine, generateListFromRange } from './utils.js'
import { sequence } from './sequence.js'

/**
 * Returns an array with every value in the range in random order
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @param {() => number} engine PRNG of choice
 * @returns {number[]}
 */
const intSequence = (min, max, engine = defaultEngine) => {
  return sequence(
    generateListFromRange(min, max),
    engine
  )
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(min: number, max: number) => number[]}
 */
const intSequenceWithEngine = (engine = defaultEngine) => {
  return (min, max) => intSequence(min, max, engine)
}

export {
  intSequence,
  intSequenceWithEngine
}

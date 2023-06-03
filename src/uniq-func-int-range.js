import { defaultEngine, generateListFromRange } from './utils.js'
import uniqFuncSequence from './uniq-func-sequence.js'

/**
 * Returns a PRNG function that returns unique values from the provided range.
 * @param {number} min Minimum integer
 * @param {number} max Maximum integer
 * @param {() => number} engine Engine to be used as PRNG
 * @returns {() => number}
 */
const uniqFuncIntRange = (min, max, engine = defaultEngine) => {
  return uniqFuncSequence(
    generateListFromRange(min, max),
    engine
  )
}

export default uniqFuncIntRange

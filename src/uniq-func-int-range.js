import { defaultEngine, generateListFromRange } from './utils.js'
import uniqFuncSequence from './uniq-func-sequence.js'

/**
 * Returns a PRNG function that returns unique values from the provided range.
 * @param min Minimum integer
 * @param max Maximum integer
 * @param engine Engine to be used as PRNG
 */
const uniqFuncIntRange = (min, max, engine = defaultEngine) => {
  return uniqFuncSequence(
    generateListFromRange(min, max),
    engine
  )
}

export default uniqFuncIntRange

import { defaultEngine, generateListFromRange } from './utils'
import uniqFuncSequence from './uniq-func-sequence'

/**
 * Returns a PRNG function that returns unique values from the provided range.
 * @param min Minimum integer
 * @param max Maximum integer
 * @param engine Engine to be used as PRNG
 */
const uniqFuncIntRange = (
  min: number,
  max: number,
  engine = defaultEngine
): (() => number | null) => {
  return uniqFuncSequence(generateListFromRange(min, max), engine)
}

export default uniqFuncIntRange

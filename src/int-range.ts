import { defaultEngine, generateCurry, randIntRange } from './utils'

/**
 * Returns a random number within the integer range
 * @param min Minimum integer
 * @param max Maximum integer
 * @param engine PRNG of choice
 */
const intRange = (min: number, max: number, engine = defaultEngine): number => {
  return randIntRange(min, max, engine)
}

const intRangeWithEngine = generateCurry(intRange)

export { intRange, intRangeWithEngine }

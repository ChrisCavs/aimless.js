import { intRange } from './int-range'
import { defaultEngine, generateCurry } from './utils'

/**
 * Returns a random value from the provided array
 * @param arr Array of values
 * @param engine PRNG of choice
 */
const oneOf = <T>(arr: T[], engine = defaultEngine): T => {
  return arr[intRange(0, arr.length - 1, engine)]
}

const oneOfWithEngine = generateCurry(oneOf)

export { oneOf, oneOfWithEngine }

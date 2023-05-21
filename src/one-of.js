import { intRange } from './int-range'
import { generateCurry } from './utils'

/**
 * Returns a random value from the provided array
 * @param arr Array of values
 * @param engine PRNG of choice
 */
const oneOf = (arr, engine = Math.random) => {
  return arr[intRange(0, arr.length - 1, engine)]
}

const oneOfWithEngine = generateCurry(oneOf)

export {
  oneOf,
  oneOfWithEngine
}

import { defaultEngine, generateCurry } from './utils'

/**
 * Returns a random number within the float range
 * @param min Minimum value
 * @param max Maximum value
 * @param engine PRNG of choice
 */
const floatRange = (
  min: number,
  max: number,
  engine = defaultEngine
): number => {
  return engine() * (max - min) + min
}

const floatRangeWithEngine = generateCurry(floatRange)

export { floatRange, floatRangeWithEngine }

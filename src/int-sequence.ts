import { defaultEngine, generateCurry, generateListFromRange } from './utils'
import { sequence } from './sequence'

/**
 * Returns an array with every value in the range in random order
 * @param min Minimum value
 * @param max Maximum value
 * @param engine PRNG of choice
 */
const intSequence = (
  min: number,
  max: number,
  engine = defaultEngine
): number[] => {
  return sequence(generateListFromRange(min, max), engine)
}

const intSequenceWithEngine = generateCurry(intSequence)

export { intSequence, intSequenceWithEngine }

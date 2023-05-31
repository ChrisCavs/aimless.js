import { defaultEngine, generateCurry, generateListFromRange } from './utils.js'
import { sequence } from './sequence.js'

/**
 * Returns an array with every value in the range in random order
 * @param min Minimum value
 * @param max Maximum value
 * @param engine PRNG of choice
 */
const intSequence = (min, max, engine = defaultEngine) => {
  return sequence(
    generateListFromRange(min, max),
    engine
  )
}

const intSequenceWithEngine = generateCurry(intSequence)

export {
  intSequence,
  intSequenceWithEngine
}

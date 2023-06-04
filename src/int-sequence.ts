import { defaultEngine, generateListFromRange } from './utils'
import { sequence } from './sequence'

const intSequence = (min, max, engine = defaultEngine) => {
  return sequence(
    generateListFromRange(min, max),
    engine
  )
}

const intSequenceWithEngine = (engine = defaultEngine) => {
  return (min, max) => intSequence(min, max, engine)
}

export {
  intSequence,
  intSequenceWithEngine
}

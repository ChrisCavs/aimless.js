import { Engine, defaultEngine, generateListFromRange } from './utils'
import { sequence } from './sequence'

const intSequence = (min: number, max: number, engine: Engine = defaultEngine): number[] => {
  return sequence(
    generateListFromRange(min, max),
    engine
  )
}

const intSequenceWithEngine = (engine = defaultEngine) => {
  return (min: number, max: number) => intSequence(min, max, engine)
}

export {
  intSequence,
  intSequenceWithEngine
}

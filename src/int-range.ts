import { Engine, defaultEngine, randIntRange } from './utils'

const intRange = (min: number, max: number, engine: Engine = defaultEngine): number => {
  return randIntRange(min, max, engine)
}

const intRangeWithEngine = (engine = defaultEngine) => {
  return (min: number, max: number) => intRange(min, max, engine)
}

export {
  intRange,
  intRangeWithEngine
}

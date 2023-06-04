import { defaultEngine, randIntRange } from './utils'

const intRange = (min, max, engine = defaultEngine) => {
  return randIntRange(min, max, engine)
}

const intRangeWithEngine = (engine = defaultEngine) => {
  return (min, max) => intRange(min, max, engine)
}

export {
  intRange,
  intRangeWithEngine
}

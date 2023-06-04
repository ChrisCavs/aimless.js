import { intRange } from './int-range'
import { defaultEngine } from './utils'

const bool = (engine: () => number = defaultEngine): boolean => {
  return !!intRange(0, 1, engine)
}

const boolWithEngine = (engine: () => number = defaultEngine) => {
  return () => bool(engine)
}

export {
  bool,
  boolWithEngine
}

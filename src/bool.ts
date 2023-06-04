import { intRange } from './int-range'
import { Engine, defaultEngine } from './utils'

const bool = (engine: Engine = defaultEngine): boolean => {
  return !!intRange(0, 1, engine)
}

const boolWithEngine = (engine: Engine = defaultEngine) => {
  return () => bool(engine)
}

export {
  bool,
  boolWithEngine
}

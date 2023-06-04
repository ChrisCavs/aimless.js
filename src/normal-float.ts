import { floatRange } from './float-range'
import { Engine, defaultEngine } from './utils'

const normalFloat = (engine: Engine = defaultEngine): number => {
  return floatRange(-1, 1, engine)
}

const normalFloatWithEngine = (engine: Engine = defaultEngine) => {
  return () => normalFloat(engine)
}

export {
  normalFloat,
  normalFloatWithEngine
}

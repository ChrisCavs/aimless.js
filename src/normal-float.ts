import { floatRange } from './float-range'
import { defaultEngine } from './utils'

const normalFloat = (engine = defaultEngine) => {
  return floatRange(-1, 1, engine)
}

const normalFloatWithEngine = (engine = defaultEngine) => {
  return () => normalFloat(engine)
}

export {
  normalFloat,
  normalFloatWithEngine
}

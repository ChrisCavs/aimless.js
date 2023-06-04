import { defaultEngine } from "./utils"

const floatRange = (min, max, engine = defaultEngine) => {
  return engine() * (max - min) + min
}

const floatRangeWithEngine = (engine = defaultEngine) => {
  return (min, max) => floatRange(min, max, engine)
}

export {
  floatRange,
  floatRangeWithEngine
}

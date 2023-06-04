import { Engine, defaultEngine } from "./utils"

const floatRange = (min: number, max: number, engine: Engine = defaultEngine): number => {
  return engine() * (max - min) + min
}

const floatRangeWithEngine = (engine = defaultEngine) => {
  return (min: number, max: number) => floatRange(min, max, engine)
}

export {
  floatRange,
  floatRangeWithEngine
}

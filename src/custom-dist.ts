import { Engine, defaultEngine } from "./utils"

const customDist = <T>(func: (num: number) => T, engine: Engine = defaultEngine): T => {
  return func(engine())
}

const customDistWithEngine = <T>(engine: Engine = defaultEngine) => {
  return (func: (num: number) => T) => customDist(func, engine)
}

export {
  customDist,
  customDistWithEngine
}
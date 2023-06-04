import { defaultEngine } from "./utils"

const customDist = (func, engine = defaultEngine) => {
  return func(engine())
}

const customDistWithEngine = (engine = defaultEngine) => {
  return (func) => customDist(func, engine)
}

export {
  customDist,
  customDistWithEngine
}
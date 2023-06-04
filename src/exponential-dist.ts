import { defaultEngine } from "./utils"

const exponentialDist = (lambda, engine = defaultEngine) => {
  return -Math.log(1 - engine()) / lambda
}

const exponentialDistWithEngine = (engine = defaultEngine) => {
  return (lambda) => exponentialDist(lambda, engine)
}

export {
  exponentialDist,
  exponentialDistWithEngine
}

import { Engine, defaultEngine } from "./utils"

const exponentialDist = (lambda: number, engine: Engine = defaultEngine): number => {
  return -Math.log(1 - engine()) / lambda
}

const exponentialDistWithEngine = (engine: Engine = defaultEngine) => {
  return (lambda: number) => exponentialDist(lambda, engine)
}

export {
  exponentialDist,
  exponentialDistWithEngine
}

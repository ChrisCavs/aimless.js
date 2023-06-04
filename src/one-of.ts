import { intRange } from './int-range'
import { Engine, defaultEngine } from './utils'

const oneOf = <T>(arr: T[], engine: Engine = defaultEngine): T => {
  return arr[intRange(0, arr.length - 1, engine)]
}

const oneOfWithEngine = <T>(engine: Engine = defaultEngine) => {
  return (arr: T[]) => oneOf(arr, engine)
}

export {
  oneOf,
  oneOfWithEngine
}

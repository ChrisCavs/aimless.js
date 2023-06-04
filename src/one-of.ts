import { intRange } from './int-range'
import { defaultEngine } from './utils'

const oneOf = (arr, engine = defaultEngine) => {
  return arr[intRange(0, arr.length - 1, engine)]
}

const oneOfWithEngine = (engine = defaultEngine) => {
  return (arr) => oneOf(arr, engine)
}

export {
  oneOf,
  oneOfWithEngine
}

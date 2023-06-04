import { intRange } from './int-range'
import { defaultEngine } from './utils'

const char = (str, engine = defaultEngine) => {
  return str[intRange(0, str.length - 1, engine)]
}

const charWithEngine = (engine = defaultEngine) => {
  return (str) => char(str, engine)
}

export {
  char,
  charWithEngine
}

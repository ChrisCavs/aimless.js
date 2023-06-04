import { intRange } from './int-range'
import { Engine, defaultEngine } from './utils'

const char = (str: string, engine: Engine = defaultEngine): string => {
  return str[intRange(0, str.length - 1, engine)]
}

const charWithEngine = (engine: Engine = defaultEngine) => {
  return (str: string) => char(str, engine)
}

export {
  char,
  charWithEngine
}

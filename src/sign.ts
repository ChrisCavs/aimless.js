import { bool } from './bool'
import { Engine, defaultEngine } from './utils'

const sign = (engine: Engine = defaultEngine): 1 | -1 => {
  return bool(engine) ? 1 : -1
}

const signWithEngine = (engine: Engine = defaultEngine) => {
  return () => sign(engine)
}

export {
  sign,
  signWithEngine
}

import { bool } from './bool'
import { defaultEngine } from './utils'

const sign = (engine = defaultEngine) => {
  return bool(engine) ? 1 : -1
}

const signWithEngine = (engine = defaultEngine) => {
  return () => sign(engine)
}

export {
  sign,
  signWithEngine
}

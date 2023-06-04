import { defaultEngine, generateListFromRange } from './utils'
import uniqFuncSequence from './uniq-func-sequence'

const uniqFuncIntRange = (min, max, engine = defaultEngine) => {
  return uniqFuncSequence(
    generateListFromRange(min, max),
    engine
  )
}

export default uniqFuncIntRange

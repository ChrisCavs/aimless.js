import { Engine, defaultEngine, generateListFromRange } from './utils'
import uniqFuncSequence from './uniq-func-sequence'

const uniqFuncIntRange = (min: number, max: number, engine: Engine = defaultEngine): () => (number | null) => {
  return uniqFuncSequence(
    generateListFromRange(min, max),
    engine
  )
}

export default uniqFuncIntRange

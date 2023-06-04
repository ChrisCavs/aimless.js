import { defaultEngine, randIntRange, sliceOut } from './utils'

const sequence = (arr, engine = defaultEngine) => {
  const result = []

  let tempArr = arr
  let i

  while (result.length < arr.length) {
    i = randIntRange(0, tempArr.length - 1, engine)
    result.push(tempArr[i])
    tempArr = sliceOut(tempArr, i)
  }

  return result
}

const sequenceWithEngine = (engine = defaultEngine) => {
  return (arr) => sequence(arr, engine)
}

export {
  sequence,
  sequenceWithEngine
}

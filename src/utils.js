const generateListFromRange = (min, max) => {
  const result = []

  for (let i = min; i <= max; i++) {
    result.push(i)
  }

  return result
}

export { generateListFromRange }

const randIntRange = (i, j, engine = Math.random) => {
  const min = Math.ceil(i)
  const max = Math.floor(j)

  return Math.floor(engine() * (max - min + 1)) + min
}

export { randIntRange }

const sliceOut = (arr, i) => {
  return arr.slice(0, i).concat(arr.slice(i + 1))
}

export { sliceOut }

const generateCurry = (func) => {
  return (engine = Math.random) => {
    return (...args) => {
      return func(...args, engine)
    }
  }
}

export { generateCurry }
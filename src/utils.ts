const defaultEngine = () => {
  try {
    // Credit @ Tamás Sallai
    const crypto = window.crypto
    const buffer = new ArrayBuffer(8)
    const ints = new Int8Array(buffer)
    crypto.getRandomValues(ints)

    ints[7] = 63
    ints[6] |= 0xf0

    return new DataView(buffer).getFloat64(0, true) - 1
  } catch (e) {
    return Math.random()
  }
}

const generateListFromRange = (min, max) => {
  const result = []

  for (let i = min; i <= max; i++) {
    result.push(i)
  }

  return result
}

const randIntRange = (i, j, engine = defaultEngine) => {
  const min = Math.ceil(i)
  const max = Math.floor(j)

  return Math.floor(engine() * (max - min + 1)) + min
}

const sliceOut = (arr, i) => {
  return arr.slice(0, i).concat(arr.slice(i + 1))
}

export {
  generateListFromRange,
  randIntRange,
  sliceOut,
  defaultEngine,
}
const intRange = (i, j) => {
    const min = Math.ceil(i)
    const max = Math.floor(j)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const floatRange = (min, max) => {
    return Math.random() * (max - min) + min
}

export default {
    intRange,
    floatRange
}

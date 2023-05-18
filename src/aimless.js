const intRange = (i, j, big=false) => {
    const min = Math.ceil(i)
    const max = Math.floor(j)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const floatRange = (min, max) => {
    return Math.random() * (max - min) + min
}

const weighted = (nums, weights) => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    const randomNumber = Math.random() * totalWeight

    let cumulativeWeight = 0
    let selectedIndex = 0

    for (let i = 0; i < nums.length; i++) {
        cumulativeWeight += weights[i]
        if (randomNumber < cumulativeWeight) {
            selectedIndex = i
            break
        }
    }

    return nums[selectedIndex]
}

const normalDist = (mean, stdDev) => {
    // Box-Muller transform
    let u, v, s

    do {
        u = (Math.random() * 2) - 1
        v = (Math.random() * 2) - 1
        s = u ** 2 + v ** 2
    } while (s === 0 || s >= 1)

    const t = Math.sqrt((-2 * Math.log(s)) / s)
    const randomNumber = mean + (stdDev * u * t)

    return randomNumber
}

const seededFunc = (seed) => {
    // Park-Miller PRNG
    let currentSeed = seed % 2147483647

    return function () {
        currentSeed = (currentSeed * 16807) % 2147483647
        return (currentSeed - 1) / 2147483646
    }
}

export default {
    intRange,
    floatRange,
    weighted,
    normalDist,
    seededFunc
}

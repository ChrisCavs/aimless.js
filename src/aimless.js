class Aimless {
    constructor(engine) {
        this.engine = engine || Math.random
    }

    call() {
        return this.engine()
    }

    intRange(i, j) {
        const min = Math.ceil(i)
        const max = Math.floor(j)
        return Math.floor(this.engine() * (max - min + 1)) + min
    }

    floatRange(min, max) {
        return this.engine() * (max - min) + min
    }

    weighted(nums, weights) {
        if (nums.length !== weights.length) {
            throw new Error('Every provided number must have a corresponding weight')
        }

        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
        const randomNumber = this.engine() * totalWeight

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

    normalDist(mean, stdDev) {
        // Box-Muller transform
        let u, v, s

        do {
            u = (this.engine() * 2) - 1
            v = (this.engine() * 2) - 1
            s = u ** 2 + v ** 2
        } while (s === 0 || s >= 1)

        const t = Math.sqrt((-2 * Math.log(s)) / s)
        const randomNumber = mean + (stdDev * u * t)

        return randomNumber
    }

    intSequence(min, max) {
        // random sequence of the range returned as array
    }

    arrSequence(arr) {
        
    }

    static seededFunc(seed) {
        // Park-Miller PRNG
        let currentSeed = seed % 2147483647

        return function () {
            currentSeed = (currentSeed * 16807) % 2147483647
            return (currentSeed - 1) / 2147483646
        }
    }
}

export default Aimless

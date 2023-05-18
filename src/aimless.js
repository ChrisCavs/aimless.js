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

    sequence(arr) {
        const result = []
        let tempArr = arr
        let i

        while (result.length < arr.length) {
            i = this.intRange(0, tempArr.length - 1)
            result.push(tempArr[i])
            tempArr = tempArr.slice(0, i).concat(tempArr.slice(i + 1))
        }

        return result
    }

    intSequence(min, max) {
        const arr = []
        for (let i = min; i <= max; i++) {
            arr.push(i)
        }
        return this.sequence(arr)
    }

    bool() {
        return !!this.intRange(0,1)
    }

    char(str) {
        return str[this.intRange(0, str.length - 1)]
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

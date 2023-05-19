const generateListFromRange = (min, max) => {
    const result = []
    for (let i = min; i <= max; i++) {
        result.push(i)
    }
    return result
}

const randIntRange = (i, j, engine) => {
    const min = Math.ceil(i)
    const max = Math.floor(j)
    return Math.floor(engine() * (max - min + 1)) + min
}

const sliceOut = (arr, i) => {
    return arr.slice(0, i).concat(arr.slice(i + 1))
}

class Aimless {
    constructor(engine = Math.random) {
        this.engine = engine
    }

    /**
     * Call the provided engine
     */
    call() {
        return this.engine()
    }

    /**
     * Returns a random number within the integer range
     * @param min Minimum integer
     * @param max Maximum integer
     */
    intRange(min, max) {
        return randIntRange(min, max, this.engine)
    }

    /**
     * Returns a random number within the float range
     * @param min Minimum value
     * @param max Maximum value
     */
    floatRange(min, max) {
        return this.engine() * (max - min) + min
    }

    /**
     * Returns a random number between -1 and 1
     */
    normal() {
        return this.floatRange(-1, 1)
    }

    /**
     * Returns a random value from the provided array
     * @param arr Array of values
     */
    oneOf(arr) {
        return arr[this.intRange(0, arr.length - 1)]
    }

    /**
     * Returns a new array with randomized order
     * @param arr Array of values
     */
    sequence(arr) {
        const result = []
        let tempArr = arr
        let i

        while (result.length < arr.length) {
            i = this.intRange(0, tempArr.length - 1)
            result.push(tempArr[i])
            tempArr = sliceOut(tempArr, i)
        }

        return result
    }

    /**
     * Returns an array with every value in the range in random order
     * @param min Minimum value
     * @param max Maximum value
     */
    intSequence(min, max) {
        return this.sequence(
            generateListFromRange(min, max)
        )
    }

    /**
     * Returns a random boolean (true or false)
     */
    bool() {
        return !!this.intRange(0,1)
    }

    /**
     * Returns a random sign (-1 or 1)
     */
    sign() {
        return this.bool() ? 1 : -1
    }

    /**
     * Returns a random character from the provided array
     * @param str String
     */
    char(str) {
        return str[this.intRange(0, str.length - 1)]
    }

    /**
     * Returns a random value from the provided array, biased towards provided weights
     * @param nums Array of numbers (integer or float)
     * @param weights Array of weights (integer or float)
     */
    weighted(nums, weights) {
        if (nums.length !== weights.length) {
            throw new Error(
                'Every provided number must have a corresponding weight'
            )
        }

        const totalWeight = weights.reduce(
            (sum, weight) => sum + weight, 0
        )
        const rand = this.engine() * totalWeight

        let cumulativeWeight = 0
        let selectedIndex = 0

        for (let i = 0; i < nums.length; i++) {
            cumulativeWeight += weights[i]
            if (rand < cumulativeWeight) {
                selectedIndex = i
                break
            }
        }

        return nums[selectedIndex]
    }

    /**
     * Returns a random value that follows a normal distribution
     * @param mean Mean
     * @param stdDev Standard Deviation
     */
    normalDist(mean, stdDev) {
        // Box-Muller transform
        let u, v, s

        do {
            u = (this.engine() * 2) - 1
            v = (this.engine() * 2) - 1
            s = u ** 2 + v ** 2
        } while (s === 0 || s >= 1)

        const t = Math.sqrt((-2 * Math.log(s)) / s)
        const rand = mean + (stdDev * u * t)

        return rand
    }

    /**
     * Returns a random value that follows an exponential distribution
     * @param lambda Lambda
     */
    exponentialDist(lambda) {
        return -Math.log(1 - this.engine()) / lambda
    }

    /**
     * Returns a random value that follows a custom distribution
     * @param func Distribution function that accepts a random number between 0 and 1
     */
    customDist(func) {
        return func(this.engine())
    }

    /**
     * Returns a valid RFC4122 version4 ID hex string, using the provided engine
     */
    uuid() {
        // Credit @Alexey Silin from https://gist.github.com/1308368
        var a = ''
        var b = ''
        for (b = a = ''; a++ < 36; b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ this.engine() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-') {}
        return b
    }

    /**
     * Returns a seeded PRNG function
     * @param seed Seed (integer)
     */
    static seedFunc(seed) {
        // Park-Miller PRNG
        let currentSeed = seed % 2147483647

        return () => {
            currentSeed = (currentSeed * 16807) % 2147483647
            return (currentSeed - 1) / 2147483646
        }
    }

    /**
     * Returns a PRNG function that returns unique values from the provided array.
     * @param arr Array of values to pull from
     * @param engine Engine to be used as PRNG
     */
    static uniqFuncSequence(arr, engine = Math.random) {
        let tempArr = arr

        return () => {
            if (!tempArr.length) return null

            const i = randIntRange(0, tempArr.length - 1, engine)
            const result = tempArr[i]
            tempArr = sliceOut(tempArr, i)

            return result
        }
    }

    /**
     * Returns a PRNG function that returns unique values from the provided range.
     * @param min Minimum integer
     * @param max Maximum integer
     * @param engine Engine to be used as PRNG
     */
    static uniqFuncIntRange(min, max, engine = Math.random) {
        return this.uniqFuncSequence(
            generateListFromRange(min, max),
            engine
        )
    }
}

export default Aimless

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

    call() {
        return this.engine()
    }

    intRange(min, max) {
        return randIntRange(min, max, this.engine)
    }

    floatRange(min, max) {
        return this.engine() * (max - min) + min
    }

    oneOf(arr) {
        return arr[this.intRange(0, arr.length - 1)]
    }

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

    intSequence(min, max) {
        return this.sequence(
            generateListFromRange(min, max)
        )
    }

    bool() {
        return !!this.intRange(0,1)
    }

    char(str) {
        return str[this.intRange(0, str.length - 1)]
    }

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

    static seedFunc(seed) {
        // Park-Miller PRNG
        let currentSeed = seed % 2147483647

        return () => {
            currentSeed = (currentSeed * 16807) % 2147483647
            return (currentSeed - 1) / 2147483646
        }
    }

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

    static uniqFuncIntRange(min, max, engine = Math.random) {
        return this.uniqFuncSequence(
            generateListFromRange(min, max),
            engine
        )
    }
}

export default Aimless

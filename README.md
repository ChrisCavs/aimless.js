<img width="490" alt="Aimless.js" src="https://github.com/ChrisCavs/aimless.js/assets/32932937/9db1ddae-b7a4-47f1-a5e4-daee5761ecd1">

[![Aimless.js on NPM](https://img.shields.io/npm/v/aimless.js.svg?style=flat-square)](https://www.npmjs.com/package/aimless.js) [![Aimless.js Downloads on NPM](https://img.shields.io/npm/dm/aimless.js.svg?style=flat-square)](https://www.npmjs.com/package/aimless.js)

The missing JS randomness library.

[Demo Page](https://chriscavs.github.io/aimless-demo/)

## Why?

Outside of large game engines and frameworks, there is very little support for generating random numbers in JavaScript.  Sure, there are quite a number of substitutes for the native `Math.random` function, but what if I wanted to generate a random number within a range?  Better yet, what if I wanted to do anything but get a number between 0 and 1?

Aimless is the missing JS randomness library.  It's tiny (< 6kB), unopinionated, dependency-free, and provides a variety of helpful random number utilities.  Best of all, it's compatible with all your favorite PRNGs.

## Getting Started

Follow these steps:

1. [Install](#install)
2. [Instantiate](#instantiate)
3. [Review API](#api)

## Install

Install and add it to your `package.json` dependencies.

```
$ npm install aimless.js --save
```

Then `import` it into the file where you'll use it.

```es6
import Aimless from 'aimless.js'
```

## Instantiate

Create an instance, passing in your preferred engine (PRNG/RNG).  By default Aimless.js will use `Math.random` as the engine.
**Note: any engine that returns a number between 0 and 1 inclusively will work**

```es6
// Default 
const aimless = new Aimless()

// Custom
const aimless = new Aimless(prng)
```

## API

Instance Methods
* call
* intRange
* floatRange
* normal
* oneOf
* sequence
* intSequence
* bool
* sign
* char
* weighted
* normalDist
* exponentialDist
* customDist
* uuid

Class Methods
* seedFunc
* uniqFuncSequence
* uniqFuncIntRange

### .call()

Calls the provided/default engine, returning a number between 0 and 1.

### .intRange(min, max)

Returns a random integer between `min` and `max`.

```es6
const randomInteger = aimless.intRange(5, 10)
```

### .floatRange(min, max)

Returns a random float between `min` and `max`.

```es6
const randomFloat = aimless.floatRange(0.1, 0.2)
```

### .normal()

Returns a random float between `-1` and `1`.

### .oneOf(array)

Returns a random item from the `array` provided.

```es6
const randomItem = aimless.oneOf([1,2,3])
const randomObj = aimless.oneOf([{a:1}, {b:2}, {c:3}])
```

### .sequence(array)

Returns a new array with the same items contained in `array` but in random order.

```es6
const randomSeq = aimless.sequence([1,2,3])
// could return [3,1,2], [2,3,1], etc.
```

### .intSequence(min, max)

Returns an array with all integers between `min` and `max` in random order.

```es6
const intSeq = aimless.intSequence(-1, 3)
// could return [3,-1,2,1,0], [0,2,-1,3,1], etc
```

### .bool()

Returns either `true` or `false`.

### .sign()

Returns either `-1` or `1`.

### .char(string)

Returns a random character from the provided `string`.

```es6
const randomChar = aimless.char('the missing JS randomness library')
// could return 's', ' ', 'l', etc
```

### .weighted(numbers, weights)

Returns one of the `numbers` provided, biased towards the corresponding `weights` provided.  `numbers` can include floats.

```es6
const weightedDiceRoll = aimless.weighted(
    [1,2,3,4,5,6],
    [1,1,1,1,1,10]
)
// will return 6 much more often than the other options
```

### .normalDist(mean, stdDev)

Returns a random number following a normal distribution with mean `mean` and standard deviation `stdDev`.

```es6
const samples = []

for (let i = 0; i < 100000; i++) {
    const randomValue = aimless.normalDist(0, 1)
    samples.push(randomValue)
}

// you can expect the mean of `samples` to be 0 +/- 0.01
```

### .exponentialDist(lambda)

Returns a random number following an exponential distribution with the provided `lambda`.

```es6
const samples = []
const lambda = 0.5

for (let i = 0; i < 100000; i++) {
    const randomValue = aimless.exponentialDist(lambda)
    samples.push(randomValue)
}

// you can expect the mean of `samples` to be (1 / lambda) +/- 0.01
```

### .customDist(function)

Returns a random number following a custom distribution of your choosing.  `function` should take in a number between `0` and `1`.

```es6
const randomOfCustomDist = aimless.customDist(
    (randomNumber) => randomNumber / 2
)
```

### .uuid()

Returns a valid RFC4122 version4 ID hex string, using the provided `engine`.

```es6
const uuid = aimless.uuid()
console.log(uuid) // ef486db4-7f49-43b3-a1ea-b0e0a22bc944
```

### Aimless.seedFunc(seed)

Class method (static) that returns a seeded random number generator.  Seeded RNGs produce random numbers, but are predictable if you use the same seed.  **note**: the Park-Miller PRNG is used to provide the seeded function.

```es6
const seededFunction = Aimless.seedFunc(1)
seededFunction() // 0.000007825903601782307
seededFunction() // 0.13153778773875702
seededFunction() // 0.7556053220812281

const newSeeded = Aimless.seedFunc(1)
newSeeded() // 0.000007825903601782307
newSeeded() // 0.13153778773875702
newSeeded() // 0.7556053220812281
```

### Aimless.uniqFuncSequence(array, engine)

Class method (static) that returns a **unique** random number from the provided `array`, using the provided `engine`.  If no `engine` is passed, `Math.random` will be used.  If there are no unique values left to return, `null` will be returned.

```es6
const uniqueRNG = Aimless.uniqFuncSequence([10, 20, 30])
uniqueRNG() // 20
uniqueRNG() // 30
uniqueRNG() // 10
uniqueRNG() // null
```

### Aimless.uniqFuncIntRange(min, max, engine)

Class method (static) that returns a **unique** random number between `min` and `max`, using the provided `engine`.  If no `engine` is passed, `Math.random` will be used.  If there are no unique values left to return, `null` will be returned.

```es6
const uniqueRNG = Aimless.uniqFuncIntRange(1, 3)
uniqueRNG() // 2
uniqueRNG() // 3
uniqueRNG() // 1
uniqueRNG() // null
```

## Browser Support

Aimless relies on ES5 array methods, and is supported in all modern browsers.  Support for legacy or depricated browsers is not planned.

## License

[MIT](https://opensource.org/licenses/MIT). © 2023 Christopher Cavalea
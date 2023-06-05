<img width="490" alt="Aimless.js" src="https://github.com/ChrisCavs/aimless.js/assets/32932937/9db1ddae-b7a4-47f1-a5e4-daee5761ecd1">

[![Aimless.js on NPM](https://img.shields.io/npm/v/aimless.js.svg?style=flat-square)](https://www.npmjs.com/package/aimless.js) [![Aimless.js Downloads on NPM](https://img.shields.io/npm/dm/aimless.js.svg?style=flat-square)](https://www.npmjs.com/package/aimless.js) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Aimless.js%20the%20missing%20JS%20randomness%20library&url=https://github.com/ChrisCavs/aimless.js&hashtags=javascript,random,developers,frontend)

The missing JS randomness library.  [See a demo](https://chriscavs.github.io/aimless-demo/).

![image](https://github.com/ChrisCavs/aimless.js/assets/32932937/33055db1-6d2e-4993-93ba-f5c05b6f38c9)
![image](https://github.com/ChrisCavs/aimless.js/assets/32932937/b0809c08-8cf3-4326-a26b-4baa90ef4d70)


## Why?

Outside of large game engines and frameworks, there is very little support for generating random numbers in JavaScript.  Sure, there are quite a number of substitutes for the native `Math.random` function. However, these replacements aren't always easy to use, and aren't feature-rich.

Aimless is the missing JS randomness library.  It's tiny (< 6kB), unopinionated, dependency-free, and provides a variety of helpful random number utilities to make your life easier.  Best of all, it's compatible with all your favorite PRNGs.

## Getting Started

Follow these steps:

1. [Install](#install)
2. [Using Custom PRNG](#using-custom-prng)
3. [Review API](#api)

## Install

Install and add it to your `package.json` dependencies.

```
$ npm install aimless.js --save
```

Then `import` utility functions into the file where you'll use them.

```es6
import { bool, intRange } from 'aimless.js'
```

## Using Custom PRNG

Aimless.js is compatible with any custom PRNG that returns a number `num >= 0` and `num < 1`.  Every function accepts an `engine` to be used.

```es6
import { bool } from 'aimless.js'

const engine = () => 0
bool(engine) // false
```

Additionally, every function in Aimless has a counterpart named `withEngine`.  This function will return its counterpart with a closure around your engine, so you don't need to pass it every time.

```es6
import { boolWithEngine } from 'aimless.js'

const engine = () => 0
const bool = boolWithEngine(engine)
bool() // false
```

Every function will default to using the provided `defaultEngine` if no custom engine is provided.  The default engine uses `crypto.getrandomvalues` when available, with a fallback of `Math.random`.

## API

### bool(engine)

Returns either `true` or `false`.

### char(string, engine)

Returns a random character from the provided `string`.

```es6
const randomChar = char('the missing JS randomness library')
// could return 's', ' ', 'l', etc
```

### customDist(function, engine)

Returns a random number following a custom distribution of your choosing.  `function` should take in a number between `0` and `1`.

```es6
const randomOfCustomDist = customDist(
    (randomNumber) => randomNumber / 2
)
```

### exponentialDist(lambda, engine)

Returns a random number following an exponential distribution with the provided `lambda`.

```es6
const samples = []
const lambda = 0.5

for (let i = 0; i < 100000; i++) {
    const randomValue = exponentialDist(lambda)
    samples.push(randomValue)
}

// you can expect the mean of `samples` to be (1 / lambda) +/- 0.01,
// generating more samples will ensure a mean of (1 / lambda)
```

### floatRange(min, max, engine)

Returns a random float between `min` and `max`.

```es6
const randomFloat = floatRange(0.1, 0.2)
```

### intRange(min, max, engine)

Returns a random integer between `min` and `max`.

```es6
const randomInteger = intRange(5, 10)
```

### intSequence(min, max, engine)

Returns an array with all integers between `min` and `max` in random order.

```es6
const intSeq = intSequence(-1, 3)
// could return [3,-1,2,1,0], [0,2,-1,3,1], etc
```

### normalDist(mean, stdDev, engine)

Returns a random number following a normal distribution with mean `mean` and standard deviation `stdDev`.

```es6
const samples = []

for (let i = 0; i < 100000; i++) {
    const randomValue = normalDist(0, 1)
    samples.push(randomValue)
}

// you can expect the mean of `samples` to be 0 +/- 0.01,
// generating more samples will ensure a mean of 0
```

### normalFloat(engine)

Returns a random float between `-1` and `1`.

### oneOf(array, engine)

Returns a random item from the `array` provided.

```es6
const randomItem = oneOf([1,2,3])
const randomObj = oneOf([{a:1}, {b:2}, {c:3}])
```

### seedFunc(seed)

Returns a seeded random number generator.  Seeded RNGs produce random numbers, but are predictable if you use the same seed.  **note**: the Park-Miller PRNG is used to provide the seeded function, therefore, an `engine` is not accepted.

```es6
const seededFunction = seedFunc(1)
seededFunction() // 0.000007825903601782307
seededFunction() // 0.13153778773875702
seededFunction() // 0.7556053220812281

const newSeeded = seedFunc(1)
newSeeded() // 0.000007825903601782307
newSeeded() // 0.13153778773875702
newSeeded() // 0.7556053220812281
```

### sequence(array, engine)

Returns a new array with the same items contained in `array` but in random order.

```es6
const randomSeq = sequence([1,2,3])
// could return [3,1,2], [2,3,1], etc.
```

### sign(engine)

Returns either `-1` or `1`.

### uniqFuncIntRange(min, max, engine)

Returns a **unique** random number between `min` and `max`, using the provided `engine`.  If no `engine` is passed, the defaultEngine will be used.  If there are no unique values left to return, `null` will be returned.

```es6
const uniqueRNG = uniqFuncIntRange(1, 3)
uniqueRNG() // 2
uniqueRNG() // 3
uniqueRNG() // 1
uniqueRNG() // null
```

### uniqFuncSequence(array, engine)

Returns a **unique** random number from the provided `array`, using the provided `engine`.  If no `engine` is passed, the defaultEngine will be used.  If there are no unique values left to return, `null` will be returned.

```es6
const uniqueRNG = uniqFuncSequence([10, 20, 30])
uniqueRNG() // 20
uniqueRNG() // 30
uniqueRNG() // 10
uniqueRNG() // null
```

### uuid(engine)

Returns a valid RFC4122 version4 ID hex string, using the provided `engine`.

```es6
const id = uuid()
console.log(id) // ef486db4-7f49-43b3-a1ea-b0e0a22bc944
```

### weighted(numbers, weights, engine)

Returns one of the `numbers` provided, biased towards the corresponding `weights` provided.  `numbers` can include floats.

```es6
const weightedDiceRoll = weighted(
    [1,2,3,4,5,6],
    [1,1,1,1,1,10]
)
// will return 6 much more often than the other options
```

## Contributing

If you have any ideas for the project, please [open an issue](https://github.com/ChrisCavs/aimless.js/issues).  I monitor issues frequently and it is a great place for active discussion on new features, refactors, etc.  Even if your idea is half-baked, it may well be worth opening an issue and starting a discussion!

If you'd like, you can also open a [pull request](https://github.com/ChrisCavs/aimless.js/pulls). I am happy to review your code or branch off of it. However, please note that I am unlikely to merge code directly into aimless.js due to code quality / copywrite concerns.  If you're just tooling around with an idea, an [issue](https://github.com/ChrisCavs/aimless.js/issues) might have more success.

## Browser Support

Aimless relies on ES5 array methods, and is supported in all modern browsers.  Support for legacy or depricated browsers is not planned.

## License

[MIT](https://opensource.org/licenses/MIT). © 2023 Christopher Cavalea

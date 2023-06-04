import { defaultEngine } from "./utils.js"

const uuid = (engine: () => number = defaultEngine): string => {
  // Credit @Alexey Silin from https://gist.github.com/1308368
  let a: any = ''
  let b: any = ''
  // eslint-disable-next-line
  for (b = a = ''; a++ < 36; b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ engine() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-') { }
  return b
}

const uuidWithEngine = (engine: () => number = defaultEngine) => {
  return () => uuid(engine)
}

export {
  uuid,
  uuidWithEngine
}

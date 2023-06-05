import { intRangeWithEngine } from "./int-range.js";
import { Engine, defaultEngine } from "./utils.js"

const uuid = (engine: Engine = defaultEngine): string => {
  // Credit @Alexey Silin from https://gist.github.com/1308368
	// Creates a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
	// where each x is a random hexadecimal digit from 0 to f, and y is a random
	// hexadecimal digit from 8 to b.
	const randomRange = intRangeWithEngine(engine)
	const defaultGenerator = (): string => randomRange(0, 15).toString(16)
	const groups: object[] = [
		{ length: 8 },
		{ length: 4 },
		{
			length: 4,
			generator: (index: number) => index === 0 ? 4 : defaultGenerator()
		},
		{
			length: 4,
			generator: (index: number) =>
				(index === 0 ? randomRange(8, 11).toString(16) : defaultGenerator())
		},
		{ length: 12 }
	];
	return groups.map(
		({ length, generator }: any) => {
			const group: string[] = [];
			for (let index = 0; index < length; index++) {
				group.push(generator !== undefined
					? generator(index)
					: defaultGenerator()
				)
			}
			return group.join('')
		}
	).join('-')
}

const uuidWithEngine = (engine: Engine = defaultEngine) => {
  return () => uuid(engine)
}

export {
  uuid,
  uuidWithEngine
}

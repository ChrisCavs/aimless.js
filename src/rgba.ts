import { intRange } from './int-range'

const rgba = (alpha?: number) => {
  const r = intRange(0, 255)
  const g = intRange(0, 255)
  const b = intRange(0, 255)
  if (alpha === undefined || alpha === null) return `rgb(${r}, ${g}, ${b})`
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export {
  rgba
}

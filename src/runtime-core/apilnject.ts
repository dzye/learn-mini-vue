import { getCurrentInstance } from "./component"

export function provide(key, value) {
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    let { provides } = currentInstance
    const parentsProvides = currentInstance.parent.provides
    if (provides === parentsProvides) {
      provides = currentInstance.provides = Object.create(parentsProvides)
    }
    provides[key] = value
  }
}
export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    const parentsProvides = currentInstance.parent.provides
    if (key in parentsProvides) {
      return parentsProvides[key]
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') {
        return defaultValue()
      } else {
        return defaultValue
      }
    }
  }
}

export const useDebounce = (fn: Function, duration: number = 600) => {
  let id: any
  return (...args: any) => {
    clearTimeout(id)
    let self = this
    id = setTimeout(() => {
      fn.apply(self, args)
    }, duration)
  }
}

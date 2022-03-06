import { mutableHandlers, readonlyHandlers } from './baseHandlers';
function createReactiveObject(row, baseHandlers) {
  return new Proxy(row, baseHandlers);
}
export function reactive(row) {
  return createReactiveObject(row, mutableHandlers);
}
export function readonly(row) {
  return createReactiveObject(row, readonlyHandlers);
}

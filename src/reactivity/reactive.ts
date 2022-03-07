import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandlers';

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

function createReactiveObject(row, baseHandlers) {
  return new Proxy(row, baseHandlers);
}
export function reactive(row) {
  return createReactiveObject(row, mutableHandlers);
}
export function readonly(row) {
  return createReactiveObject(row, readonlyHandlers);
}
export function shallowReadonly(row) {
  return createReactiveObject(row, shallowReadonlyHandlers);
}
export function isProxy(row) {
  return isReactive(row) || isReadonly(row);
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

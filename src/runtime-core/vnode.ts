import { isObject } from './../shared/index';
import { ShapeFlags } from "../shared/shapeFlags"

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')
export function createVNode(type, props?, children?) {
  const vnode = {
    type, props, children, el: null, shapeFlag: getShapeFlag(type)
  }
  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (isObject(children)) {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }
  }
  
  return vnode
}
function getShapeFlag(type: any) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}

export function createTextVnode(text: string) {
  return createVNode(Text, null, text)
}

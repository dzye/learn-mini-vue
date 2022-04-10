import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from './vnode';

export function render(vnode, container) {
  patch(vnode, container)
}
function patch(vnode, container) {
  const { type, shapeFlag } = vnode
  switch (type) {
    case Fragment:
      processFragment(vnode, container)
      break
    case Text:
      processText(vnode, container)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container)
      }
      break
  }

}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(initialVnode: any, container: any) {
  const instance = createComponentInstance(initialVnode)
  setupComponent(instance)
  setupRenderEffect(instance, initialVnode, container)
}

function setupRenderEffect(instance: any, initialVnode, container: any) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy);
  patch(subTree, container)
  initialVnode.el = subTree.el
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type))
  const { children, props } = vnode
  if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  } else if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  }
  for (const key in props) {
    const val = props[key]
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), val)
    } else {
      el.setAttribute(key, val)
    }
  }
  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}
function processElement(vnode: any, container: any) {
  return mountElement(vnode, container)
}

function processFragment(vnode: any, container: any) {
  return mountChildren(vnode, container)
}

function processText(vnode: any, container: any) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}


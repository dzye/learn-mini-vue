import { isObject } from '../shared/index';
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  patch(vnode, container)
}
function patch(vnode, container) {
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
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
  if (Array.isArray(children)) {
    mountChildren(children, el)

  } else if (typeof children === 'string') {
    el.textContent = children
  }
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }
  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.forEach(v => {
    patch(v, container)
  })
}
function processElement(vnode: any, container: any) {
  return mountElement(vnode, container)
}


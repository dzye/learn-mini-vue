import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options) {

  const { createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert } = options;

  function render(vnode, container, parentComponent) {
    patch(vnode, container, parentComponent)
  }
  function patch(vnode, container, parentComponent) {
    const { type, shapeFlag } = vnode
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent)
        break
      case Text:
        processText(vnode, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent)
        }
        break
    }

  }

  function processComponent(vnode: any, container: any, parentComponent: any) {
    mountComponent(vnode, container, parentComponent)
  }

  function mountComponent(initialVnode: any, container: any, parentComponent: any) {
    const instance = createComponentInstance(initialVnode, parentComponent)
    setupComponent(instance)
    setupRenderEffect(instance, initialVnode, container)
  }

  function setupRenderEffect(instance: any, initialVnode, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy);
    patch(subTree, container, instance)
    initialVnode.el = subTree.el
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const el = (vnode.el = hostCreateElement(vnode.type))
    const { children, props } = vnode
    if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    } else if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    }
    for (const key in props) {
      const val = props[key]

      hostPatchProp(el, key, val)
    }
    hostInsert(el, container)
    // container.append(el)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(v => {
      patch(v, container, parentComponent)
    })
  }
  function processElement(vnode: any, container: any, parentComponent) {
    return mountElement(vnode, container, parentComponent)
  }

  function processFragment(vnode: any, container: any, parentComponent) {
    return mountChildren(vnode, container, parentComponent)
  }

  function processText(vnode: any, container: any) {
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
  }
  return { createApp: createAppAPI(render) }
}

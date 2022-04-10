import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'
export const Foo = {
  setup() {
    return {
    }
  },
  render() {
    const foo = h("p", {}, "foo")
    const age = 18
    // return h('div', {}, [foo, h('div', {}, this.$slots)])
    // return h('div', {}, [foo, renderSlots(this.$slots)])
    return h('div', {}, [renderSlots(this.$slots, 'hander', { age }), foo, renderSlots(this.$slots, 'footer')])
  }
}

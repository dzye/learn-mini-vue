import { h, createTextVnode } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
export const App = {
  render() {
    const app = h('div', {}, "App");
    const foo = h(Foo, {}, { hander: ({ age }) => [h("p", {}, "hander" + age), createTextVnode("你好呀")], footer: () => h("p", {}, 'footer') })
    return h('div', {}, [app, foo]);
  },
  setup() {
    return {};
  },
};

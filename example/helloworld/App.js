import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {
  render() {
    return h('div', { id: 'root', class: ["red", "hard"], onClick() { console.log("click") } },
      'hi ' + this.msg
      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
    );
  },
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
};

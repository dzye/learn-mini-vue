import { readonly, isReadonly, isProxy } from '../reactive';
describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const observed = readonly(original);
    expect(original).not.toBe(observed);
    expect(observed.foo).toBe(1);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(observed)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);
    expect(isReadonly(observed.bar)).toBe(true);
    expect(isProxy(observed)).toBe(true);
    expect(isProxy(original)).toBe(false);
  });
  it('warn when call set', () => {
    console.warn = jest.fn();
    const user = readonly({ age: 10 });
    user.age = 11;
    expect(console.warn).toBeCalled();
  });
});

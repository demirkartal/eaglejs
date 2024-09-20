/*!
 * EagleJS 0.8.2 (https://github.com/demirkartal/eaglejs)
 * Copyright 2020-2024 Cem Demirkartal
 * Licensed under MIT
 */
declare class EagleJS extends Array<EventTarget> {
  constructor(...items: EventTarget[]);
  static isEventTarget(value: unknown): value is EventTarget;
  addClass(...names: string[]): this;
  after(...nodes: (Node | string)[]): this;
  append(...nodes: (Node | string)[]): this;
  attr(name: string): string | null;
  attr(name: string, value: string): this;
  before(...nodes: (Node | string)[]): this;
  children(filter?: string | null): EagleJS;
  clone(deep?: boolean): EagleJS;
  closest(selectors: string): EagleJS;
  concat(...items: (ConcatArray<EventTarget> | EventTarget)[]): EagleJS;
  contents(): EagleJS;
  data(): DOMStringMap;
  data(key: string): string | undefined;
  data(key: string, value: string): this;
  empty(): this;
  filterWith(selectors: string, condition?: boolean): EagleJS;
  hasAttr(name: string): boolean;
  hasClass(name: string): boolean;
  html(): string;
  html(value: string): this;
  matches(selectors: string): boolean;
  next(filter?: string | null): EagleJS;
  off(type: string, listener: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): this;
  off<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, event: GlobalEventHandlersEventMap[K]) => unknown, options?: EventListenerOptions | boolean): this;
  on(type: string, listener: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): this;
  on<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, event: GlobalEventHandlersEventMap[K]) => unknown, options?: AddEventListenerOptions | boolean): this;
  parent(filter?: string | null): EagleJS;
  prepend(...nodes: (Node | string)[]): this;
  prev(filter?: string | null): EagleJS;
  push(...items: EventTarget[]): number;
  querySelector(selectors: string): EagleJS;
  querySelectorAll(selectors: string): EagleJS;
  ready(listener: EventListener): this;
  remove(): this;
  removeAttr(...names: string[]): this;
  removeClass(...names: string[]): this;
  replaceWith(...nodes: (Node | string)[]): this;
  siblings(filter?: string | null): EagleJS;
  text(): string | null;
  text(value: string): this;
  toggleAttr(name: string, force?: boolean): this;
  toggleClass(name: string, force?: boolean): this;
  trigger(event: Event): this;
  unshift(...items: EventTarget[]): number;
}
export default EagleJS;
interface EagleJS {
  filter(predicate: (value: EventTarget, index: number, array: EventTarget[]) => unknown, thisArg?: unknown): EagleJS
  reverse(): this
  slice(start?: number, end?: number): EagleJS
  splice(start: number, deleteCount?: number): EagleJS
  splice(start: number, deleteCount: number, ...items: EventTarget[]): EagleJS
}
// # sourceMappingURL=EagleJS.d.mts.map

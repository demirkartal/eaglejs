/*!
 * EagleJS 0.8.3 (https://github.com/demirkartal/eaglejs)
 * Copyright 2020-2025 Cem Demirkartal
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
  children(): EagleJS;
  clone(deep?: boolean): EagleJS;
  closest(selectors: string): EagleJS;
  concat(...items: (ConcatArray<EventTarget> | EventTarget)[]): EagleJS;
  contents(): EagleJS;
  data(): DOMStringMap;
  data(key: string): string | undefined;
  data(key: string, value: string): this;
  empty(): this;
  filter(predicate: (value: EventTarget, index: number, array: EventTarget[]) => unknown, thisArg?: unknown): EagleJS;
  filterWith(selectors: string, condition?: boolean): EagleJS;
  hasAttr(name: string): boolean;
  hasClass(name: string): boolean;
  html(): string;
  html(value: string): this;
  matches(selectors: string): boolean;
  next(): EagleJS;
  off(type: string, listener: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): this;
  off<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, event: GlobalEventHandlersEventMap[K]) => unknown, options?: EventListenerOptions | boolean): this;
  on(type: string, listener: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): this;
  on<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, event: GlobalEventHandlersEventMap[K]) => unknown, options?: AddEventListenerOptions | boolean): this;
  parent(): EagleJS;
  prepend(...nodes: (Node | string)[]): this;
  prev(): EagleJS;
  push(...items: EventTarget[]): number;
  querySelector(selectors: string): EagleJS;
  querySelectorAll(selectors: string): EagleJS;
  ready(listener: EventListener): this;
  remove(): this;
  removeAttr(...names: string[]): this;
  removeClass(...names: string[]): this;
  replaceWith(...nodes: (Node | string)[]): this;
  reverse(): this;
  siblings(): EagleJS;
  slice(start?: number, end?: number): EagleJS;
  splice(start: number, deleteCount?: number, ...items: EventTarget[]): EagleJS;
  text(): string | null;
  text(value: string): this;
  toggleAttr(name: string, force?: boolean): this;
  toggleClass(name: string, force?: boolean): this;
  trigger(event: Event): this;
  unshift(...items: EventTarget[]): number;
}
export default EagleJS;
// # sourceMappingURL=EagleJS.d.mts.map

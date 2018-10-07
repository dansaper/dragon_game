export function bindFunctions<T extends { [index: string]: any }>(obj: T): T {
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === "function") {
      obj[k] = obj[k].bind(obj);
    }
  }
  return obj;
}

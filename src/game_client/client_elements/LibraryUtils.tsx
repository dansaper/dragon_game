export function bindFunctions<T extends { [index: string]: any }>(obj: T): T {
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === "function") {
      obj[k] = obj[k].bind(obj);
    }
  });
  return obj;
}

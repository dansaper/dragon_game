export function fuzzyMatch(strOrRegex: string | RegExp): RegExp {
  if (typeof strOrRegex === "string") {
    return new RegExp(".*" + strOrRegex + ".*");
  }
  return new RegExp(".*" + strOrRegex.source + ".*");
}

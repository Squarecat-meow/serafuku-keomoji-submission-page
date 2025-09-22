export function formDataParser<T extends Record<string, any>>( // eslint-disable-line
  data: FormData,
): T {
  const result = {} as T;

  for (const [k, v] of data.entries()) {
    const typedKey = k as keyof T;
    if (k === "aliases" && v.toString().length <= 0) {
      result[typedKey] = [] as T[keyof T];
    } else if (k === "aliases" && v.toString().length > 0) {
      result[typedKey] = v.toString().split(",") as T[keyof T];
    } else if (typeof v === "object") {
      continue;
    } else if (v === "true" || v === "false") {
      result[typedKey] = (v === "true") as T[keyof T];
    } else if (k === "id") {
      result[typedKey] = parseInt(v) as T[keyof T];
    } else {
      result[typedKey] = v.toString() as T[keyof T];
    }
  }
  return result;
}

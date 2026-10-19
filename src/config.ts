// src/config.ts
const args = process.argv.slice(2);
const has = (f: string) => args.includes(f);
const get = (f: string) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

export const PORT = Number(get("--port") ?? process.env.PORT ?? 3000);
export const HOST = has("--local") ? "127.0.0.1" : "0.0.0.0";
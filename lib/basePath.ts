export function withBasePath(path: string | undefined | null): string | undefined | null {
  if (!path) return path as any
  // External URLs or data URIs: leave as-is
  if (/^https?:\/\//i.test(path) || /^data:/i.test(path)) return path
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '').replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

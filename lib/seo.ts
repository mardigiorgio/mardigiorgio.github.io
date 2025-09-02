import site from './site.config.json'

export const siteConfig = site

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

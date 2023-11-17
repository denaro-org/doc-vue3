import type { Config, GenJsonResult } from './types'

import { config as defaultConfig } from './utils/config'
import { genHtml } from './utils/genHtml'
import { genJson } from './utils/genJson'
import { genMd } from './utils/genMd'

export const docVue3 = (
  code: string,
  config: Config
): string | GenJsonResult => {
  config = Object.assign({}, defaultConfig, config)

  switch (config.type) {
    case 'html':
      return genHtml(code)
    case 'md':
      return genMd(code)
    default:
      return genJson(code)
  }
}

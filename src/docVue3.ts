import {
  type Config,
  type GenJsonResult
} from './types'
import { config as defaultConfig } from './utils/config'
import { genHtml } from './utils/genHtml'
import { genMd } from './utils/genMd'
import { genJson } from './utils/genJson'

export const docVue3 = (code, config: Config): string | GenJsonResult => {
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

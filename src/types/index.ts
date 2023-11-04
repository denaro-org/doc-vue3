export interface Config {
  type: 'json' | 'md' | 'html'
}

export interface Params {
  desc?: string
  name?: string
}

export interface ParseComment {
  params?: Params[]
}

export interface GenSlotsResult extends Params {
  name?: string
}

export interface GenPropsResult extends Params {
  default?: string
  name?: string
  required?: boolean
  tsType?: string
  type?: string
}

export interface GenMethodsResult extends Params {
  name?: string
}

export interface GenEventsResult extends Params {
  name?: string
  param?: string
}

export interface MdTable {
  headers?: string[]
  rows?: string[]
}

export interface MdList {
  blockquote?: string
  h2?: string
  table?: MdTable
}

export interface GenJsonResult {
  defineEmits?: GenEventsResult[]
  defineEmitsTypeParameters?: string
  defineExpose?: GenMethodsResult[]
  defineProps?: GenPropsResult[]
  definePropsTypeParameters?: string
  events?: GenEventsResult[]
  methods?: GenMethodsResult[]
  props?: GenPropsResult[]
  slots?: GenSlotsResult[]
  withDefaults?: GenPropsResult[]
}

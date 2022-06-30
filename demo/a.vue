<template inheritsAttr="false">
  <div :class="[`${$prefix('dib')}`, 'lw-a-link']">
    <a-button
      v-if="type === 'link'"
      class="a-btn-link"
      :class="`${$prefix('row-center')} ${aClass}`"
      type="link"
      :disabled="loading || disabled"
      v-bind="$attrs"
    >
      <div v-if="$slots.icon || componentSvg">
        <span
          v-if="!loading"
          :class="svgClass || $prefix('mr5')"
        >
          <!-- @doc 开启 icon 下自定义图标插槽 -->
          <slot
            v-if="$slots.icon"
            name="icon"
            :class="svgClass"
          />
          <lw-svg
            v-else
            v-bind="svgProps"
            :class="svgClass"
            :type="componentSvg"
            v-on="svgProps.on"
          />
        </span>
        <lw-svg
          v-else
          type="LoadingOutlined"
          :class="`${$prefix('fs12')} ${svgClass}`"
        />
      </div>
      <lw-svg
        v-if="!componentSvg && loading"
        type="LoadingOutlined"
        :class="`${$prefix('fs12')} ${svgClass}`"
      />
      <!-- @doc link 类型按钮的默认插槽 -->
      <slot v-else />
    </a-button>
    <a
      v-else
      v-bind="$attrs"
      :class="aClass"
      href="javascript:;"
    >
      <!-- @doc a 标签类型按钮的默认插槽 -->
      <slot />
    </a>
  </div>
</template>

<script setup>
/** ********** 【import】 *************/
import { computed } from 'vue'

import LwSvg from '../Ant_Svg'

/** ********** 【defineProps】 *************/
const props = defineProps({
  // @doc 是否缩放
  scale: {
    type: Boolean,
    default: false
  },
  // @doc svg 的额外类名
  svgClass: {
    type: String,
    default: ''
  },
  // @doc svg 图标属性
  svgProps: {
    type: Object,
    default () {
      return {}
    }
  },
  // @doc 显示的 icon
  componentSvg: {
    type: String,
    default: ''
  },
  // @doc 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // @doc 是否加载
  loading: {
    type: Boolean,
    default: false
  },
  // @doc link 使用a-button的 link a 使用 a 标签-按需使用
  type: {
    type: String,
    default: 'link'
  },
  // @doc 按钮的额外类名
  btnClass: {
    type: String,
    default: ''
  }
})

/** ********** 【defineEmits】 *************/

/** ********** 【vue hooks】【composition api】 *************/
const aClass = computed(() => {
  const {
    btnClass, scale
  } = props
  return `${btnClass}${scale ? ' is-scale' : ''}`
})

/** ********** 【defineExpose】 *************/
</script>

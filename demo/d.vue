<template>
  <div class="component-crt-crud">
    嘻嘻嘻嘻嘻嘻嘻
    <!-- @doc 自定义操作列内容 -->
    <slot name="customAction"></slot>
    <!-- @doc 弹窗内容 -->
    <slot name="modal"></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  // @doc 增删改查目标的名称
  // @default ''
  crudName: string

  // @doc 详情弹窗表单字段配置列表
  // @default () => []
  modalFormSchema?: unknown[]

  // @doc 详情弹窗宽度
  // @default '1200px'
  modalWidth?: string

  // @doc 详情弹窗表单label宽度
  // @default '300px'
  modalLabelWidth?: string

  // @doc 查询表单字段配置列表
  // @default () => []
  searchFormSchema?: unknown[]

  // @doc 查询表单col组件的span属性
  // @default 8
  colSpan?: number

  // @doc 表格列，同 a-table 的 columns 参数
  // @default () => []
  columns?: unknown[]

  // @doc 表格rowKey 同 a-table 的 rowKey 参数
  // @default 'id'
  rowKey?: string | null

  // @doc 是否可选择
  // @default false
  isSelect?: boolean

  // @doc 是否可导出
  // @default false
  isDownload?: boolean

  // @doc 是否可删除单行数据
  // @default false
  isDeleteRow?: boolean

  // @doc 是否可编辑单行数据
  // @default false
  isEditRow?: boolean

  // @doc 是否可查看单行数据
  // @default false
  isShowRow?: boolean

  // @doc 查询列表方法
  // @default () => Promise.resolve()
  searchListFunc?: () => Promise<void>

  // @doc 查询单行数据方法
  // @default () => Promise.resolve()
  searchRowFunc?: () => Promise<void>

  // @doc 添加方法
  // @default () => Promise.resolve()
  createRowFunc?: () => Promise<void>

  // @doc 更新方法
  // @default () => Promise.resolve()
  updateRowFunc?: () => Promise<void>

  // @doc 删除方法
  // @default () => Promise.resolve()
  deleteRowFunc?: () => Promise<void>
}

defineProps<Props>()

interface Emit {
  // @doc 导出按钮点击
  downloadClick: [e: Event]
  // @doc 添加按钮点击
  createClick: [e: Event]
  // @doc 查看按钮点击
  showClick: [e: Event, record: unknown]
  // @doc 编辑按钮点击
  editClick: [e: Event, record: unknown]
  // @doc 删除按钮点击
  deleteClick: [e: Event, record: unknown]
  // @doc 详情数据点击
  detailChange: [e: Event, record: unknown]
}

defineEmits<Emit>()
</script>

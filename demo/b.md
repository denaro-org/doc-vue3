## slots

| name | desc |
| ---- | ---- |
| customAction | 自定义操作列内容 |
| modal | 弹窗内容 |

## defineProps

| name | type | desc | default | required |
| ---- | ---- | ---- | ------- | -------- |
| pic | Array as () => Array<string> | 增删改查目标的名称 | [] | true |

> types:【Props】

## defineEmits

| name | desc |
| ---- | ---- |
| click | 查询列表方法 |
| downloadClick | 导出按钮点击 |
| createClick | 添加按钮点击 |
| showClick | 查看按钮点击 |
| editClick | 编辑按钮点击 |
| deleteClick | 删除按钮点击 |
| detailChange | 详情数据变更 |

> types:【Emits】

## defineExpose

| name | desc | params | returns |
| ---- | ---- | ------ | ------- |
| edit | 编辑一行 | record: 该行数据 |  |

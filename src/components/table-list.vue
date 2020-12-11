<template>
  <el-table :data="list">
    <template v-for="item in listTitle">
      <el-table-column
        v-if="item.type === 'operation'"
        :width="calculateWidth(item.width)"
        :key="item.key"
        :label="item.name"
      >
        <template slot-scope="scope">
          <el-link
            v-for="operationItem in (scope.row[item.key] || [])"
            :key="operationItem.key"
            :type="operationItem.buttonType || 'success'"
            @click="$emit(
              'operation',
              {
                key: operationItem.key,
                data: operationItem.data || {},
                row: scope.row
              }
            )"
          >
            {{ operationItem.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.type === 'html'"
        :width="calculateWidth(item.width)"
        :key="item.key"
        :label="item.name"
      >
        <template slot-scope="scope">
          <span v-html="scope.row[item.key]"></span>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :width="calculateWidth(item.width)"
        :key="item.key"
        :prop="item.key"
        :label="item.name"
      />
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    listTitle: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    calculateWidth (width) {
      if (typeof width === 'number') {
        return `${width}px`
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-link + .el-link {
  margin-left: 10px;
}
// 某些项目中，比如：简题库。将cell的样式写成了不换行，导致出现了内容后边跟省略号的问题
/deep/ .cell {
  white-space: normal!important;
}
/deep/ body {
  background-color: red;
}
// /deep/ iframe {
//   html,
//   body {
//     margin: 0;
//   }
// }
</style>

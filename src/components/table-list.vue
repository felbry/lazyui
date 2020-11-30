<template>
  <el-table :data="list">
    <template v-for="item in listTitle">
      <el-table-column
        v-if="item.type === 'operation'"
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
            {{ item.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        v-else
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
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-link + .el-link {
  margin-left: 10px;
}
</style>

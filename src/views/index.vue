<template>
  <div>
    <!-- <Condition :condition="condition" export-path="/ff" @search="search" />
    <TableList /> -->
    <LazyTable
      :get-condition-func="getConditionFunc"
      :getListFunc="getListFunc"
      export-url="/dfdd/ffdf"
      :is-show-pagination="false"
      @operation="operation"
    />
  </div>
</template>
<script lang="ts">
import { Condition, TableList, LazyTable } from '@/export.ts'
import lazyapi from '@/api.ts'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    Condition,
    TableList,
    LazyTable
  }
})
export default class Home extends Vue {
  condition = []

  search () {
    // console.log(form)
  }

  getConditionFunc () {
    return lazyapi['get:/mock/1706/condition']()
  }

  getListFunc (form) {
    return lazyapi['get:/mock/1706/table-list'](form)
  }

  operation (obj) {
    console.log(obj)
  }
}
</script>
<style lang="less" scoped></style>

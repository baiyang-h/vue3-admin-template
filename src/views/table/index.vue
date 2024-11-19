<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="700">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="date" label="Date"  />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="city" label="City" />
      <el-table-column label="Operations" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pagination.current"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :small="true"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Table'
}
</script>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getTableData } from '@/api/table'

const tableData = ref([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 20,
})

onMounted(() => {
  fetchList()
})

function fetchList() {
  getTableData().then(r => {
    if(r.success) {
      tableData.value = r.data.list
      pagination.total = r.data.total
    }
  })
}

const onSizeChange = (val) => {
  console.log(`${val} items per page`)
  fetchList()
}
const onCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  fetchList()
}

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 15px;
  justify-content: flex-end;
}
</style>

<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          预测模型
        </template>
      </el-table-column>
      <el-table-column label="大小" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { zipList } from '@/api/data'

export default {
  name: 'zipSearch',
  data() {
    return {
      list: null,
      listLoading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      zipList(this.listQuery).then(response => {
        this.list = response.data
        console.log(response)
        this.listLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

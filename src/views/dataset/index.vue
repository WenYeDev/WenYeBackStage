<template>
  <div class="app-container">
    <el-input
      v-model="filename"
      placeholder="请输入名字"
      style="width: 350px"
      prefix-icon="el-icon-document"
    />
    <!-- <el-button
      :loading="downloadLoading"
      style="margin-bottom: 20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >
      导出所选数据集
    </el-button> -->
    <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
      <el-tag type="info">Documentation</el-tag>
    </a> -->
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
      <!-- <el-table-column type="selection" align="center" /> -->
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="数据量" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.nums }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="" width="120">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="downloadFile(scope.row.url,scope.row.name)">
              下载
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dataList } from "@/api/data";

export default {
  name: "SelectExcel",
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      dataList().then((response) => {
        console.log(response.data);
        this.list = response.data;
        this.listLoading = false;
      });
    },
    downloadFile(url,name){
      let alink = document.createElement('a');
      alink.style.display = 'none';
      alink.download = name+'.zip'; //下载后文件名
      alink.href = url;
      document.body.appendChild(alink);
      alink.click();
      document.body.removeChild(alink); //下载完成移除元素
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

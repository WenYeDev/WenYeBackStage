<template>
  <div>
    <input ref="zip-upload-input" value="" class="zip-upload-input" type="file" accept=".zip" @change="handleClick">
    
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <el-input
      placeholder="选择文件"
      v-model="zipShowName"
      style="width: 200px;left: 0%;top: -40%; position: absolute;"
      prefix-icon="el-icon-document"
      :disabled="true"
    />
      在此处放置Zip文件
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        浏览
      </el-button>
    </div>
    <el-button
      :loading="loading"
      style="top:10px;left: 47%; position:relative;" 
      size="medium" type="primary" 
      @click="upLoad"
      icon="el-icon-upload"
      >
      上 传
    </el-button>
  
  </div>
</template>

<script>
// import XLSX from 'xlsx'
import { ZipUpload } from "@/api/data";
export default {
  // props: {
  //   beforeUpload: Function, // eslint-disable-line
  //   onSuccess: Function// eslint-disable-line
  // },
  data() {
    return {
      loading: false,
      zipData:{
        zipName:null,
        zip:null
      },
      zipShowName:null
      // excelData: {
      //   header: null,
      //   results: null
      // }
    }
  },
  methods: {
    // generateData({ header, results }) {
    //   this.excelData.header = header
    //   this.excelData.results = results
    //   this.onSuccess && this.onSuccess(this.excelData)
    // },
    upLoad(){
      var formdata=new FormData();
      formdata.append("file",this.zipData.zip)
      if(this.zipData.zip===null){
        this.$message.error('请选择文件')
        return
      }
      this.loading=true
      ZipUpload(formdata).then((response) => {
        if(response.code==20000){
          this.$message.success('上传成功')
        }else{
          this.$message.error(response.message)
        }
        this.clearFile()
        this.loading=false
      });
    },
    clearFile(){
      this.zipData.zip=null
      this.zipData.zipName=null
      this.zipShowName=null
      this.$refs['zip-upload-input'].value=null
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只支持上传一个文件!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isZip(rawFile)) {
        this.$message.error('只支持zip格式文件')
        return false
      }
      this.zipChange(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['zip-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.zipChange(rawFile)
    },
    zipChange(rawFile) {
      this.zipData.zip=rawFile
      this.zipData.zipName=rawFile.name
      if(rawFile.name.length>10){
        var sp=rawFile.name.split('.')
        this.zipShowName=rawFile.name.substring(0,4)+".."+sp[0].substring(sp[0].length-3,sp[0].length)+"."+sp[1]
      }
    },
    // readerData(rawFile) {
    //   this.loading = true
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.onload = e => {
    //       const data = e.target.result
    //       const workbook = XLSX.read(data, { type: 'array' })
    //       const firstSheetName = workbook.SheetNames[0]
    //       const worksheet = workbook.Sheets[firstSheetName]
    //       const header = this.getHeaderRow(worksheet)
    //       const results = XLSX.utils.sheet_to_json(worksheet)
    //       this.generateData({ header, results })
    //       this.loading = false
    //       resolve()
    //     }
    //     reader.readAsArrayBuffer(rawFile)
    //   })
    // },
    // getHeaderRow(sheet) {
    //   const headers = []
    //   const range = XLSX.utils.decode_range(sheet['!ref'])
    //   let C
    //   const R = range.s.r
    //   /* start in the first row */
    //   for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
    //     const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    //     /* find the cell in the first row */
    //     let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    //     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    //     headers.push(hdr)
    //   }
    //   return headers
    // },
    isZip(file) {
      return /\.(zip)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.zip-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>

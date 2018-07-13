<template>
  <div class="account-manage">
    <div class="operations">
      <div class="item">
        <div class="key">批量导入评委：</div>
        <div class="value">
          <el-upload ref="upload" class="upload" action="" :before-upload="beforeUploadJudge" :limit=1 multiple method="post" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain">
            <el-button size="small" class="batch-import" type="primary" plain>点击导入</el-button>
          </el-upload>
        </div>
        <div class="description">
          （请先下载模板，填写完毕上传导入；
          <el-button type="text" class="download-button" @click="downloadJudgeTemplate">点击下载</el-button>
        ）</div>
      </div>

      <div class="item">
        <div class="key">批量导入学生：</div>
        <div class="value">
          <el-upload ref="upload" class="upload" action="" :before-upload="beforeUploadStudent" :limit=1 multiple method="post" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain">
            <el-button size="small" class="batch-import" type="primary" plain>点击导入</el-button>
          </el-upload>
        </div>
        <div class="description">
          （请先下载模板，填写完毕上传导入；
          <el-button type="text" class="download-button" @click="downloadStudentTemplate">点击下载</el-button>
        ）</div>
      </div>
    </div>
  </div>
</template>

<script>
  import api_account from '@/api/account'
  import account from '@/mixins/account'
  export default {
    mixins: [account],
    methods: {
      downloadJudgeTemplate() {
        window.open('http://119.23.239.27:8088/static/template_file/评委小组账户（模板）.xlsx')
      },
      downloadStudentTemplate() {
        window.open('http://119.23.239.27:8088/static/template_file/班级学生列表（模板）.xlsx')
      },
      beforeUploadJudge(file) {
        let reader = new FileReader();
        const _this = this;
        reader.onload = function (e) {
          let text = reader.result;
          let param = {
            user_name: _this.$store.getters.account,
            password: _this.$store.getters.password,
            option_type: 'batch_import_account',
            file: text
          }
          api_account.batchImport(param)
            .then(data => {
              if (data == 'disallow') {
                _this.accountExpire();
              } else {
                _this.$notify.success('上传成功');
              }
            })
            .catch(error => {
              console.log(error);
              _this.$notify.error('上传失败');
            })
        }
        reader.readAsDataURL(file);
        return false
      },
      beforeUploadStudent(file) {
        let reader = new FileReader();
        const _this = this;
        reader.onload = function (e) {
          let text = reader.result;
          let param = {
            user_name: _this.$store.getters.account,
            password: _this.$store.getters.password,
            option_type: 'batch_import_student',
            file: text
          }
          api_account.batchImport(param)
            .then(data => {
              if (data == 'disallow') {
                _this.accountExpire();
              } else {
                _this.$notify.success('上传成功');
              }
            })
            .catch(error => {
              console.log(error);
              _this.$notify.error('上传失败');
            })
        }
        reader.readAsDataURL(file);
        return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/vars.scss";
  .account-manage {
    height: 100%;
    width: 100%;
    overflow: auto;
    .operations {
      .item {
        padding: 20px 0;
        display: flex;
        align-items: center;
        &:not(:last-child) {
          border-bottom: 1px solid $color-greyLine;
        }
        .key {
          width: 130px;
          text-align: right;
          margin-right: 20px;
        }
        .value {
          margin-right: 10px;
          & .el-button {
            line-height: 0.8;
            position: relative;
            top: 0.125em;
          }
        }
        .description {
          font-size: 0.9em;
          color: $color-lightGrey;
          .download-button {
            text-decoration: underline;
          }
        }
      }
      .upload {
        width: 80px;
        .batch-import {
          line-height: 25px;
        }
        .icon {
          color: $color-theme;
          width: 1.8em;
          height: 1.8em;
          position: relative;
          top: 0.5em;
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "~@/styles/vars.scss";
  .account-manage {
    .el-form {
      .el-form-item {
        margin-bottom: 25px;
      }
    }
    .account-manage-form {
      .el-form {
        :nth-child(2) {
          margin-bottom: 5px;
        }
      }
    }
    .el-form-item__content {
      line-height: 40px;
      width: 180px;
    }
    .el-upload-list {
      background: #eef1f4;
      width: 180px;
      .el-upload-list__item .el-icon-upload-success {
        color: $color-theme;
      }
    }
    .el-dialog {
      width: 500px;
      .add-account-form,
      .reset-account-form {
        .el-form-item__label,
        .el-input {
          font-size: 1em;
        }
        .el-input__inner {
          width: 250px;
        }
        .el-form-item__label {
          color: #000;
        }
        .el-form-item__error {
          color: $color-theme;
        }
      }
    }
  }
</style>

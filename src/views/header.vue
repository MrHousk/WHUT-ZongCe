<template>
  <div class="header-container">
    <div class="logo" @click="$router.push('/home')">WHUT综测互评系统</div>
    <div class="header-main">
      <div class="sign">
        <el-popover v-if="$store.getters.account" placement="bottom-end" trigger="hover" width="100">
          <div>
            <z-icon name="zhanghu"></z-icon>
            <el-button type="text" @click="updataPasswordDialogVisible = true">修改密码</el-button>
          </div>
          <div>
            <z-icon name="zhuxiao"></z-icon>
            <el-button type="text" @click="loginOut">退出账号</el-button>
          </div>
          <div slot="reference" class="logined">
            <div class="welcome">欢迎您：{{$store.getters.name}}</div>
            <img src="static/pic/avatar.png" class="avatar" alt="">
          </div>
        </el-popover>
        <div v-else class="sign-in" @click="$router.push('/login')">
          登录
        </div>
      </div>
      <div class="instruction" @click="instructionDialogVisible = true">
        使用帮助
        <z-icon name="wenhao1"></z-icon>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="updataPasswordDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="updataPasswordForm" ref="updataPasswordForm" class="update-password-form" :rules="updataPasswordFormRules"
        label-width="120px">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input v-model="updataPasswordForm.oldPassword" type="password" auto-complete="off" placeholder="请输入您的旧密码" autofocus>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input v-model="updataPasswordForm.newPassword" type="password" auto-complete="off" placeholder="请输入您的新密码" autofocus>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updataPasswordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="使用帮助" :visible.sync="instructionDialogVisible">
      <instruction></instruction>
    </el-dialog>
  </div>
</template>

<script>
  import api_account from '@/api/account'
  import instruction from '@/views/instruction'
  export default {
    data() {
      const checkPassword = (rule, value, callback) => {
        if (/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(value)) {
          callback();
        } else {
          callback(new Error("密码应至少包含数字、字母、特殊字符中的两种"))
        }
      }
      return {
        updataPasswordDialogVisible: false,
        updataPasswordForm: {
          oldPassword: '',
          newPassword: ''
        },
        updataPasswordFormRules: {
          oldPassword: [{
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          }],
          newPassword: [{
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          }, {
            min: 6,
            max: 18,
            message: '密码长度需要在6-18',
            trigger: 'blur'
          }, {
            validator: checkPassword,
            trigger: 'blur'
          }]
        },
        instructionDialogVisible: false
      }
    },
    methods: {
      updatePassword() {
        this.$refs.updataPasswordForm.validate(valid => {
          if (valid) {
            let param = {
              user_name: this.$store.getters.account,
              password: this.updataPasswordForm.oldPassword,
              option_type: 'update_password',
              the_password: this.updataPasswordForm.newPassword
            };
            api_account.updatePassword(param)
              .then(data => {
                if (data == 'True') {
                  this.$notify.success('修改成功，请重新登录');
                  this.$store.commit('loginOut');
                  this.$router.push('/login');
                } else if (data == 'disallow') {
                  this.$notify.closeAll()
                  this.$notify.error('旧密码错误');
                } else {
                  this.$notify.error('服务器错误');
                }
              })
          }
        })
      },
      loginOut() {
        if (window.localStorage.getItem('account')) {
          this.$confirm("您已登录，确定退出吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false
            })
            .then(() => {
              this.$store.commit('loginOut');
              this.$notify.success('登出成功');
              this.$router.push('/login');
            })
          return;
        }
      }
    },
    components: {
      instruction
    }
  }
</script>

<style lang="postcss" scoped>
  @import '../styles/vars.css';
  .header-container {
    height: 100%;
    background-color: var(--color-theme);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>.logo {
      flex: 0 0 300px;
      font-size: 1.8em;
      padding-left: 20px;
      color: var(--color-white);
      cursor: pointer;
    }
    &>.header-main {
      flex: 1 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &>.sign {
        flex-shrink: 0;
        color: var(--color-theme);
        margin-right: 20px;
        cursor: pointer;
        & .logined {
          display: flex;
          align-items: center;
          &>.welcome {
            flex-shrink: 0;
            margin-right: 10px;
            color: var(--color-white);
          }
          &>.avatar {
            height: 3em;
            width: 3em;
            border-radius: 50%;
          }
        }
        &>.sign-in {
          color: var(--color-white);
          font-size: 1.2em;
        }
      }
      &>.instruction {
        flex-shrink: 0;
        margin-right: 10px;
        color: var(--color-white);
        cursor: pointer;
        &>.icon {
          width: 1em;
          height: 1em;
        }
      }
    }
    &>>>.el-dialog {
      margin-top: 8vh !important;
      margin-bottom: 0;
      width: 500px;
      & .el-dialog__header {
        & .el-dialog__headerbtn {
          right: -40px;
          top: 10px;
          font-size: 2em;
          & .el-dialog__close {
            color: #fff;
          }
        }
      }
    }
  }
</style>

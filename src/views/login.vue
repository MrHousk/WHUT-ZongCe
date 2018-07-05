<template>
  <div class="sign-container">
    <div class="sign-content">
      <div class="logo">
        <div class="schoolBadge">
          <img src="static/pic/schoolBadge.png" alt="">
        </div>
        <div class="text">
          <div>武汉理工大学</div>
          <div>综测互评系统</div>
        </div>
      </div>
      <div class="sign-innner">
        <el-form class="loginForm" ref="loginForm" :model="loginForm" :rules="loginFormnRule">
          <el-form-item prop="account">
            <el-input v-model="loginForm.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <div>
            <el-button class="submit" type="primary" :loading="logining" @click="login">登录</el-button>
          </div>
        </el-form>
        <div class="view-judge">
          <el-button type="text" class="button" @click="getJudgeList">查看互评小组名单</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="互评小组名单" :visible.sync="judgeListDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-table :data="judgeList" border class="table">
        <el-table-column prop="studentId" label="学号" width="200px" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="job" label="任职" width="200px" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名" width="200px" sortable show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import api_account from '@/api/account'
  import api_score from '@/api/score'
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: '',
          password: ''
        },
        loginFormnRule: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        judgeListDialogVisible: false,
        judgeList: []
      }
    },
    mounted() {
      this.$notify.closeAll()
    },
    methods: {
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.logining = true
            let loginObj = {
              user_name: this.loginForm.account,
              password: this.loginForm.password
            };
            api_account.login(loginObj).then(data => {
              console.log(data);
              if (data !== 'disallow') {
                this.logining = false
                this.$store.commit('loginIn', {
                  account: this.loginForm.account,
                  password: this.loginForm.password,
                  name: data
                });
                this.$notify.success('登录成功');
                this.$router.push('/home');
              } else {
                this.$notify.closeAll()
                this.$notify.error('用户名或密码错误');
                this.logining = false
              }
            })
          }
        })
      },
      getJudgeList() {
        api_score.getJudgeList()
          .then(data => {
            const judgeList = data;
            this.judgeList = []
            for (const judge of judgeList) {
              let item = {
                studentId: judge[0],
                job: judge[1],
                name: judge[2]
              }
              this.judgeList.push(item)
            }
            this.judgeListDialogVisible = true;
          })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import '../styles/vars.css';
  .sign-container {
    height: 100vh;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-darkWhite);
    &>.sign-content {
      margin: auto;
      background-color: #fff;
      box-shadow: 0 0 25px var(--color-shadow);
      border: 1px solid var(--color-lightBlue);
      border-radius: 5px;
      width: 450px;
      &>.logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 20px;
        color: var(--color-theme);
        &>.schoolBadge {
          width: 6.5em;
          height: 6.5em;
          margin-right: 30px;
          &>img {
            position: relative;
            top: 0.3em;
            max-width: 100%;
            max-height: 100%;
          }
        }
        &>.text {
          font-size: 2em;
          &>.logo-top {
            font-size: 1.4em;
          }
        }
      }
      &>.sign-innner {
        &>.loginForm {
          padding: 25px 55px 35px;
          & .submit {
            width: 100%;
            font-size: 1.4em;
            margin-top: 15px;
            letter-spacing: 8px;
            border-radius: 100px;
          }
        }
        &>.view-judge {
          text-align: center;
          padding: 12px 0;
          background-color: var(--color-darkWhite);
          &>.button {
            font-size: 1.1em;
          }
        }
      }
    }
    &>>>.el-dialog {
      margin-top: 8vh !important;
      margin-bottom: 0;
      width: 650px;
      & .table {
        width: 602px;
      }
      & :matches(.el-dialog__header, .el-dialog__footer) {
        text-align: center;
      }
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
      & .tips {
        padding: 25px 0 0 25px;
      }
    }
  }
</style>

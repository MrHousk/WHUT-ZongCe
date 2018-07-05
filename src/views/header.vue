<template>
  <div class="header-container">
    <div class="logo" @click="$router.push('/home')">WHUT综测互评系统</div>
    <div class="header-main">
      <div class="search">
        <el-input placeholder="输入关键词进行搜索" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="sign">
        <el-popover v-if="$store.getters.account" placement="bottom-end" trigger="hover" width="100">
          <div>
            <z-icon name="zhanghu"></z-icon>
            <el-button type="text">账户管理</el-button>
          </div>
          <div>
            <z-icon name="zhuxiao"></z-icon>
            <el-button type="text" @click="loginOut">退出账号</el-button>
          </div>
          <div slot="reference" class="logined">
            <div class="welcome">欢迎您：{{$store.getters.name}}</div>
            <img src="static/pic/avatar.jpg" class="avatar" alt="">
          </div>
        </el-popover>
        <div v-else class="sign-in" @click="$router.push('/login')">
          登录
        </div>
      </div>
      <div class="instruction">
        使用帮助<z-icon name="wenhao1"></z-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
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
    }
  }
</script>

<style lang="postcss">
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
      &>.search {
        width: 350px;
        margin-right: 50px;
      }
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
  }
</style>

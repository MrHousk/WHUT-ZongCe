<template>
  <div class="home-container">
    <el-table :data="tableData" border v-loading="loading" class="table">
      <el-table-column prop="studentId" label="学号" width="200px" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="姓名" width="200px" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="scoreState" label="评分状态" width="200px" sortable show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-if="tableData[scope.$index].scoreState == 'True'">已评分</el-tag>
          <el-button v-else type="primary" size="small" @click="score(scope.row)">评分</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`请对${currentStudent.name}评分`" :visible.sync="scoreDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div v-for="(scoreItem, scoreIndex) in scoreList" :key="scoreIndex">
        <p>{{(scoreIndex + 1) + '、'+ scoreItem.content}}</p>
        <el-radio-group v-model="scoreItem.selectedScore">
          <el-radio v-for="(option, optionIndex) in scoreItem.options" :key="optionIndex" :label="option">
            {{option}}
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitScore">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api_score from '@/api/score'
  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        scoreDialogVisible: false,
        scoreList: [],
        currentStudent: {}
      }
    },
    mounted() {
      this.$notify.closeAll();
      this.generateScoreList();
      let param = {
        user_name: this.$store.getters.account,
        password: this.$store.getters.password,
        option_type: 'get_student_list'
      }
      api_score.getStudentList(param)
        .then(data => {
          console.log(data);
          const students = data;
          for (const student of students) {
            let item = {
              studentId: student[0],
              name: student[1],
              scoreState: student[2]
            }
            this.tableData.push(item)
          }
        })
    },
    methods: {
      generateScoreList() {
        let val = [{
          content: '政治思想表现（6分）',
        }, {
          content: '道德修养（6分）',
        }, {
          content: '集体观念（4分）',
        }, {
          content: '学习态度（3分）',
        }, {
          content: '遵纪守法（3分）',
        }, {
          content: '文明习惯（3分）',
        }, {
          content: '健康素质（5分）',
        }]
        for (const [key, elem] of val.entries()) {
          const score = parseInt(elem.content.substr(-3, 1))
          let options = [],
            difference = score >= 6 ? 0.2 : 0.1
          for (let i = 0; i < 4; i++) {
            options[i] = score - (difference * i)
          }
          this.scoreList.push(Object.assign({
            selectedScore: '',
            options
          }, elem))
        }
      },
      score(row) {
        this.currentStudent = row;
        this.scoreDialogVisible = true;
      },
      submitScore() {
        let score_list = []
        for (const item of this.scoreList) {
          if (item.selectedScore) {
            score_list.push(item.selectedScore)
          } else {
            this.$notify.warning('还有未选项')
            return;
          }
        }
        let param = {
          user_name: this.$store.getters.account,
          password: this.$store.getters.password,
          option_type: 'set_score',
          the_student_id: this.currentStudent.studentId,
          score_list
        }
        api_score.setScore(param)
          .then(data => {
            console.log(data);

          })
      }
    }
  }
</script>

<style lang="postcss">
  .home-container {
    & .table {
      width: 602px;
      margin: 50px auto;
    }
    & .el-dialog {
      margin-top: 8vh !important;
      margin-bottom: 0;
      width: 50%;
      max-width: 700px;
      min-width: 500px;
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
    }
  }
</style>

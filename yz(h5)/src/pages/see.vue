<template>
  <div class="form">
    <div class="formHead">
      <span
        :style="{'color':(cur==0?'#6a2b73':''),'border-bottom':(cur==0?'3px solid #6a2b73':'')}"
        @click="cur=0"
      >待提交</span>
      <span
        :style="{'color':(cur==1?'#6a2b73':''),'border-bottom':(cur==1?'3px solid #6a2b73':'')}"
        @click="submited"
      >已提交</span>
    </div>
    <div class="biao" v-if="cur==0">
       <div v-if="content.length==0" class="noData">暂无申请表信息</div>
      <div class="con" v-for="(item,index) in content" :key="index" v-else>
        <p class="title">申请表{{index+1}}</p>
        <div class="desc">基本情况</div>
        <div class="edit" @click="goEdit(item.applicantId)">修改</div>
        <div class="info">申请人姓名：{{item.applicantBasicName}}</div>
        <div class="info">性别：{{sex[item.applicantBasicSex]}}</div>
        <div class="info infor">证件类型：{{certificateType[item.applicantBasicIdtype]}}</div>
        <div class="info infor">证件号码：{{item.applicantBasicIdnumber}}</div>
        <div class="info">手机号码：{{item.applicantBasicPhone}}</div>
        <div class="cle"></div>
        <!-- ====================== -->
        <div class="desc">身体状况</div>
        <div
          class="info"
        >能否独立来公众处：{{item.applicantPhysicalIsalonenotarialoffice=='Y'?'能':item.applicantPhysicalIsalonenotarialoffice=='N'?'否':''}}</div>
        <div
          class="info"
        >能否读写：{{item.applicantPhysicalReadorwrite=='Y'?'能':item.applicantPhysicalReadorwrite=='N'?'否':''}}</div>
        <div class="cle"></div>
        <!-- ========== -->
        <div class="desc">婚姻状况</div>
        <div class="info">有过几次婚姻：{{item.applicantMaritalNumber}}</div>
        <div class="cle"></div>
        <div class="desc">父母状况</div>
        <div
          class="info"
        >父亲：{{item.applicantFatherIsbeliving=='Y'?'在世':item.applicantFatherIsbeliving=='N'?'去世':''}}</div>
        <div
          class="info"
        >母亲：{{item.applicantMotherIsbeliving=='Y'?'在世':item.applicantMotherIsbeliving=='N'?'去世':''}}</div>
        <div class="cle"></div>
        <!-- ==================== -->
        <div class="desc">子女状况</div>
        <div class="info">子女人数：{{item.applicantChildrenNumber}}</div>
        <div class="cle"></div>
        <!-- ====================== -->
        <div class="desc">财产状况</div>
        <div class="info">房产(处)：{{item.applicantPropertyHouse}}</div>
        <div class="info">车辆(辆)：{{item.applicantPropertyCar}}</div>
        <div class="info">存款(元)：{{item.applicantPropertyDeposit}}</div>
        <div class="info">其他：{{item.applicantOtherProperty}}</div>
        <div class="cle"></div>
        <!-- ================ -->

        <div class="desc">关系情况</div>

            <div class="info info3">受益人人数：{{item.applicantBeneficiaryNumber}}</div>


        <div v-for="titem in item.tBeneficiaries" :key="titem.id">
          <div class="info">受益人姓名:{{titem.beneficiary}}</div>
          <div class="info">与遗嘱人关系:{{titem.relation}}</div>
        </div>

        <div class="cle"></div>
        <div class="but" @click="lastSubmitForm(item.applicantId)">提交</div>
        <div class="cle"></div>
        <div style="height:20px"></div>
      </div>
      <div style="height:60px"></div>
    </div>

    <div class="biao" v-if="cur==1">
      <div v-if="content2.length==0" class="noData">暂无申请表信息</div>
      <div class="con" v-for="(item,index) in content2" :key="index" v-else>
        <p class="title">申请表{{index+1}}</p>
        <div class="desc">基本情况</div>
        <div class="info">申请人姓名：{{item.applicantBasicName}}</div>
        <div class="info">性别：{{sex[item.applicantBasicSex]}}</div>
        <div class="info infor">证件类型：{{certificateType[item.applicantBasicIdtype]}}</div>
        <div class="info infor">证件号码：{{item.applicantBasicIdnumber}}</div>
        <div class="info">手机号码：{{item.applicantBasicPhone}}</div>
        <div class="cle"></div>
        <!-- ====================== -->
        <div class="desc">身体状况</div>
        <div
          class="info"
        >能否独立来公众处：{{item.applicantPhysicalIsalonenotarialoffice=='Y'?'能':item.applicantPhysicalIsalonenotarialoffice=='N'?'否':''}}</div>
        <div
          class="info"
        >能否读写：{{item.applicantPhysicalReadorwrite=='Y'?'能':item.applicantPhysicalReadorwrite=='N'?'否':''}}</div>
        <div class="cle"></div>
        <!-- ========== -->
        <div class="desc">婚姻状况</div>
        <div class="info">有过几次婚姻：{{item.applicantMaritalNumber}}</div>
        <div class="cle"></div>
        <div class="desc">父母状况</div>
        <div
          class="info"
        >父亲：{{item.applicantFatherIsbeliving=='Y'?'在世':item.applicantFatherIsbeliving=='N'?'去世':''}}</div>
        <div
          class="info"
        >母亲：{{item.applicantMotherIsbeliving=='Y'?'在世':item.applicantMotherIsbeliving=='N'?'去世':''}}</div>
        <div class="cle"></div>
        <!-- ==================== -->
        <div class="desc">子女状况</div>
        <div class="info">子女人数：{{item.applicantChildrenNumber}}</div>
        <div class="cle"></div>
        <!-- ====================== -->
        <div class="desc">财产状况</div>
        <div class="info">房产(处)：{{item.applicantPropertyHouse}}</div>
        <div class="info">车辆(辆)：{{item.applicantPropertyCar}}</div>
        <div class="info">存款(元)：{{item.applicantPropertyDeposit}}</div>
        <div class="info">其他：{{item.applicantOtherProperty}}</div>
        <div class="cle"></div>
        <!-- ================ -->
        <div class="desc">关系情况</div>
         <div class="info info3">受益人人数：{{item.applicantBeneficiaryNumber}}</div>
        <div v-for="titem in item.tBeneficiaries" :key="titem.id">
          <div class="info">受益人姓名:{{titem.beneficiary}}</div>
          <div class="info">与遗嘱人关系:{{titem.relation}}</div>
        </div>

        <div class="cle"></div>
        <!-- <div class="but">提交</div> -->
        <!-- ==================== -->
        <div style="height:40px"></div>
      </div>
      <div style="height:40px"></div>
    </div>
  </div>
</template>
<script>
import { search, searchDetail, submitLastInfo } from "../api/request";
import qs from "qs";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      cur: "0",
      info: "",
      content: [],
      content2: [],
      sex: ["男", "女"],
      certificateType: [
        "出生证明",
        "组织机构代码证",
        "营业证书",
        "社会团体法人登记证书",
        "居民身份证",
        "护照",
        "军队离退休干部证",
        "武警警官证",
        "台湾居民来往大陆通行证",
        "港澳居民来往内地通行证",
        "中国人民解放军士兵证",
        "外国护照",
        "户口本",
        "其他",
      ],
    };
  },
  methods: {
    search1() {
      this.info = JSON.parse(localStorage.getItem("userInfo"));
      let info2 = {
        applicantBasicPhone: this.info.phone,
        status: 4,
      };
      // 待提交
      search(qs.stringify(info2)).then((res) => {
        this.content = res.rows;
      });
    },
    submited() {
      this.cur = 1;
      // 已提交
      let info3 = {
        applicantBasicPhone: this.info.phone,
        status: 1,
      };

      search(qs.stringify(info3)).then((res) => {
        this.content2 = res.rows;
      });
    },
    // 修改按钮点击事件
        goEdit(id) {
      this.$router.push({
        path: `/${id}`,
        query: {
          formId: id,
        },
      });
    },
    // 最后点击完成按钮提交最后得表单信息，提交到已完成里
    lastSubmitForm(id) {
      submitLastInfo(id).then((res) => {
        if (res.code == 0) {
          // localStorage.setItem("info", JSON.stringify(info));
          this.$message({
            showClose: true,
            message: "提交成功",
            type: "success",
            customClass: "mess",
            offset: 200,
          });
          this.search1();
          this.cur=1
          this.submited()
        }
      });
    },
  },
  created() {
    // 待提交
    this.search1();
  },
};
</script>
<style lang="scss" scoped>
.formHead {
  width: 650px;
  height: 100px;
  margin: 80px auto;
  span {
    display: inline-block;
    width: 40%;
    margin-left: 40px;
    text-align: center;
    height: 100%;
    line-height: 100px;
    border-bottom: 2px solid #dddddd;
  }
}
.biao {
  width: 680px;
  height: auto;
  margin: auto;
  .con {
    width: 680px;
    margin: auto;
    font-size: 21px;
    margin-bottom: 70px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    .edit {
      width: 80px;
      height: 40px;
      position: absolute;
      background-color: #6a2b73;
      border-radius: 5px;

      color: white;
      line-height: 40px;
      text-align: center;
      right: 30px;
      top:160px;
    }
    .title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      padding-top: 60px;
      font-size: 30px;
      font-weight: bold;
      padding-bottom: 60px;
    }
  }

  .desc {
    width: 640px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    margin-top: 50px;
    border-left: 5px solid #6a2b73;
    text-indent: 0.5em;
    font-size: 26px;
    margin-bottom: 20px;
  }

  .info {
    float: left;
    width: 320px;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
     word-break:break-all
  }
  .info3{
  width: 720px;
}
   .infor{
     width: 600px;
  }

}

.but {
  width: 200px;
  height: 50px;
  background-color: #6a2b73;
  border-radius: 5px;
  margin: 100px auto;
  color: white;
  line-height: 50px;
  text-align: center;
}
.cle {
  clear: both;
}
.noData{
  width: 680px;
  height: 400px;
  line-height: 400px;
  margin: auto;
  text-align: center;
  font-size: 40px;


}

</style>

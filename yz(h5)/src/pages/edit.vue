
<template>
  <div class="box">
    <div class="title">修改申请表</div>
    <div class="con">
      <!-- 基本信息 -->
      <div class="one">基本情况</div>
      <div class="tips">
        <i class="el-icon-info"></i>注意：带
        <span class="star star2">*</span> 的为必填信息！
      </div>
      <div class="tips active2" @click="$router.push('/see')">
        <i class="el-icon-info"></i>
        点击可直接进入表单预览页面
        <i class="el-icon-right"></i>
      </div>
      <div class="one-con">
        <div class="info">
          <span>申请人姓名：</span>
          <el-input placeholder="姓名" v-model="input1"></el-input>
          <span class="star">*</span>
        </div>
        <div class="info">
          <span>性别：</span>
          <el-select v-model="input2" placeholder="请选择性别">
            <el-option v-for="item in sex" :key="item.id" :value="item"></el-option>
          </el-select>
          <span class="star">*</span>
        </div>
        <div class="info infor">
          <span>证件类型：</span>
          <el-select v-model="input3" placeholder="请选择证件类型">
            <el-option v-for="item in  certificateType" :key="item.id" :value="item"></el-option>
          </el-select>
          <span class="star">*</span>
        </div>
        <div class="info infor">
          <span>证件号码：</span>
          <el-input placeholder="证件号码" v-model="input4"></el-input>
          <span class="star">*</span>
        </div>
        <div class="info">
          <span>手机号码：</span>
          <el-input placeholder="手机号码" v-model="input5"></el-input>
          <span class="star">*</span>
        </div>
      </div>
      <!-- 身体状况 -->
      <div class="one" style="margin-top:50px">身体状况</div>
      <div class="one-con">
        <div class="info">
          <p class="pp">
            <span class="star">*</span> 能否独立来公证处：
            <el-radio v-model="radio1" label="Y">能</el-radio>
            <el-radio v-model="radio1" label="N">否</el-radio>
          </p>
        </div>
        <div class="info">
          <p class="pp">
            <span class="star">*</span> 能否读写：
            <el-radio v-model="radio2" label="Y">能</el-radio>
            <el-radio v-model="radio2" label="N">否</el-radio>
          </p>
        </div>
      </div>
      <!-- 婚姻状况 -->
      <div class="one" style="margin-top:50px">婚姻状况</div>
      <div class="one-con">
        <div class="info active">
          <span>有过几次婚姻：</span>
          <el-input placeholder="婚姻次数" v-model="marrige"></el-input>
        </div>
      </div>
      <!-- 父母状况 -->
      <div class="one" style="margin-top:50px">父母状况</div>
      <div class="one-con">
        <div class="info">
          <p class="pp">
            <span class="star"></span> 父亲：
            <el-radio v-model="father" label="Y">在世</el-radio>
            <el-radio v-model="father" label="N">去世</el-radio>
          </p>
        </div>
        <div class="info">
          <p class="pp">
            <span class="star"></span> 母亲：
            <el-radio v-model="mother" label="Y">在世</el-radio>
            <el-radio v-model="mother" label="N">去世</el-radio>
          </p>
        </div>
      </div>
      <!-- 子女状况 -->
      <div class="one" style="margin-top:50px">子女状况</div>
      <div class="one-con">
        <div class="info active">
          <span>有几个子女：</span>
          <el-input placeholder="请填写子女人数" v-model="childrens"></el-input>
        </div>
      </div>
      <!-- 财产情况-->
      <div class="one" style="margin-top:50px">财产情况</div>
      <div class="one-con">
        <div class="info active">
          <span>房产(处)：</span>
          <el-input placeholder="请填写房车数量" v-model="house"></el-input>
          <span class="star">*</span>
        </div>
        <div class="info active">
          <span>车辆(辆)：</span>
          <el-input placeholder="请填写车辆数量" v-model="car"></el-input>
          <span class="star">*</span>
        </div>
        <div class="info active">
          <span>存款(元)：</span>
          <el-input placeholder="请填写存款" v-model="money"></el-input>
          <span class="star">*</span>
        </div>
        <div class="info active">
          <span>其他：</span>
          <el-input placeholder="请填写其他财产" v-model="other"></el-input>
          <span class="star">*</span>
        </div>
      </div>
      <div class="one" style="margin-top:50px">关系情况</div>
      <div class="one-con">
        <div id="info">
          <div class="info active3">
            <span>受益人人数：</span>
            <el-input placeholder="请填写受益人人数" v-model="shouyiren"></el-input>
          </div>
          <div class="btn" @click="add">确定</div>
        </div>
        <div v-for="item in info" :key="item.id">
          <div class="info active">
            <span>受益人姓名：</span>
            <el-input type="text" placeholder v-model="item.beneficiary"></el-input>
          </div>
          <div class="info active">
            <span>与遗嘱人关系：</span>
            <el-input type="text" placeholder v-model="item.relation"></el-input>
          </div>
        </div>
      </div>
      <div class="line">
        <el-divider>到底了</el-divider>
      </div>
      <div class="btn btn2" @click="submitInfo" style="margin-bottom:50px">完成</div>
      <div class="aa"></div>
    </div>
  </div>
</template>
<script>
import { submitInformation, editInfo, searchDetail } from "../api/request";
import qs from "qs";
export default {
  data() {
    return {
      cont: [],
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
      sex: ["男", "女"],
      // 基本情况
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      //身体状况
      radio1: "",
      radio2: "",
      //婚姻状况
      marrige: "",
      //父母状况
      father: "",
      mother: "",
      //子女状况
      childrens: "",
      // 财产
      house: "",
      car: "",
      money: "",
      other: "",
      shouyiren: "",
      info: [
        {
          beneficiary: "",
          relation: "",
        },
      ],
    };
  },
  methods: {
    add() {
      this.info = [
        {
          beneficiary: "",
          relation: "",
        },
      ];
      for (var i = 0; i < this.shouyiren - 1; i++) {
        this.info.push({
          beneficiary: "",
          relation: "",
        });
      }
    },
    submitInfo() {
      if (
        this.input1 == "" ||
        this.input2 == "" ||
        this.input3 == "" ||
        this.input4 == "" ||
        this.input5 == "" ||
        this.radio1 == "" ||
        this.radio2 == "" ||
        this.house == "" ||
        this.car == "" ||
        this.money == "" ||
        this.other == "" ||
        this.checkList == ""
      ) {
        this.$message({
          showClose: true,
          message: "必填项不能为空",
          customClass: "mess",
          offset: 200,
        });
      } else {
        let info = {
          applicantId: this.$route.query.formId,
          // 基本情况
          applicantBasicName: this.input1,
          applicantBasicSex: this.sex
            .map((sitem) => sitem)
            .indexOf(this.input2),
          applicantBasicIdtype: this.certificateType
            .map((sitem) => sitem)
            .indexOf(this.input3),
          // 是否为双重国籍
          applicantBasicIdnumber: this.input4,
          applicantBasicPhone: this.input5,
          // 身体状况
          applicantPhysicalIsalonenotarialoffice: this.radio1,
          applicantPhysicalReadorwrite: this.radio2,
          // 目前婚姻状况
          applicantMaritalNumber: this.marrige,
          //  父母状况
          // 1.父亲
          applicantFatherIsbeliving: this.father,
          // 2.母亲
          applicantMotherIsbeliving: this.mother,
          //  子女状况
          applicantChildrenNumber: this.childrens,
          //其他情况
          applicantPropertyCar: this.car,
          applicantPropertyHouse: this.house,
          applicantPropertyDeposit: this.money,
          applicantOtherProperty: this.other,
          applicantBeneficiaryNumber: this.shouyiren,
          tBeneficiaries: this.info,
          userPhone: JSON.parse(localStorage.getItem("userInfo")).phone,
        };
        editInfo(info).then((res) => {
          if (res.msg == "操作成功") {
            localStorage.setItem("info", JSON.stringify(info));
            this.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
              customClass: "mess",
              offset: 200,
            });
            this.$router.push("/see");
          }
        });
      }
    },
  },
  created() {
    searchDetail(this.$route.query.formId).then((res) => {
      this.cont = res.data;
      // 基本情况
      (this.input1 = this.cont.applicantBasicName),
        (this.input2 = this.sex[this.cont.applicantBasicSex]),
        (this.input3 = this.certificateType[this.cont.applicantBasicIdtype]);
      this.input4 = this.cont.applicantBasicIdnumber;
      this.input5 = this.cont.applicantBasicPhone;

      // 身体状况
      this.radio1 = this.cont.applicantPhysicalIsalonenotarialoffice;
      this.radio2 = this.cont.applicantPhysicalReadorwrite;
      //婚姻状况
      this.marrige = this.cont.applicantMaritalNumber;
      //父母状况
      //父亲
      this.father = this.cont.applicantFatherIsbeliving;

      //母亲

      this.mother = this.cont.applicantMotherIsbeliving;

      //子女状况
      this.childrens = this.cont.applicantChildrenNumber;
      //其他情况
      this.house = this.cont.applicantPropertyHouse;
      this.car = this.cont.applicantPropertyCar;
      this.money = this.cont.applicantPropertyDeposit;
      this.other = this.cont.applicantOtherProperty;
      this.shouyiren = this.cont.applicantBeneficiaryNumber;
      this.info = this.cont.tBeneficiaries;
    });
  },
};
</script>
<style lang="scss" scoped>
.box {
  .title {
    width: 100%;
    height: 100px;
    margin-top: 80px;
    margin-bottom: 80px;
    text-align: center;
    line-height: 100px;
    font-weight: bold;
    font-size: 44px;
    // color:rgb(106, 47, 115);
  }
}
.one {
  width: 650px;
  height: 50px;
  margin: auto;
  border-left: 5px solid rgb(106, 47, 115);
  line-height: 50px;
  text-indent: 0.5em;
  position: relative;
}
.one-con {
  width: 650px;
  height: auto;
  // border: 1px solid;
  margin: 60px auto;
  .info {
    margin-top: 40px;
    span {
      display: inline-block;
      width: 170px;
      text-align: right;
      font-size: 22px;
      color: #666666;
    }
    .star {
      display: inline-block;
      width: 30px;
      font-size: 30px;
      vertical-align: middle;
      color: rgb(106, 47, 115);
    }
  }
}
.star {
  display: inline-block;
  width: 30px;
  font-size: 30px;
  vertical-align: middle;
  color: rgb(106, 47, 115);
}
.star2 {
  display: inline-block;
  width: 10px;
  font-size: 30px;
  vertical-align: middle;
  color: rgb(106, 47, 115);
}
.btn {
  width: 100px;
  height: 60px;
  margin: 50px auto;
  line-height: 60px;
  text-align: center;
  background-color: rgb(106, 47, 115);
  color: white;
}
.btn2 {
  width: 300px;
  height: 80px;

  line-height: 80px;
}
.line {
  width: 680px;
  margin: 100px auto;
}
.pp {
  font-size: 22px;
  color: #666666;
}
.aa {
  height: 100px;
  width: 100%;
}
.tips {
  width: 300px;
  position: absolute;
  right: 20px;
  top: 245px;
  font-size: 18px;
}
.active2 {
  top: 280px;
}
#info {
  display: flex;
  margin-bottom: -40px;
}
</style>
<style lang="scss">
.info {
  .el-input,
  .el-input__inner {
    display: inline-block;
    width: 400px;
    height: 60px;
    font-size: 22px;
  }
}
.active {
  .el-input,
  .el-input__inner {
    display: inline-block;
    width: 400px;
    height: 60px;
    font-size: 22px;
    border: none;
    border-bottom: 1px solid #dcdfe6;
  }
}
.active3 {
  .el-input,
  .el-input__inner {
    display: inline-block;
    width: 300px;
    height: 80px;
    font-size: 22px;
    border: none;
    border-bottom: 1px solid #dcdfe6;
  }
}
.el-select-dropdown__item {
  font-size: 20px;
  color: #666666;
}
.info {
  .el-radio__inner {
    width: 25px;
    height: 25px;
  }
  .el-radio__label {
    font-size: 22px;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: rgb(130, 58, 141);
    background-color: rgb(132, 59, 143);
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: rgb(138, 60, 150);
  }
}
// .el-select-dropdown{
//   height: 200px;
// }

</style>

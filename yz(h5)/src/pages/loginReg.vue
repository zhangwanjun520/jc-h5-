<template>
  <div class="login">
    <div class="top">
      <img src="../assets/banner.png" alt />
    </div>

    <div class="right">
      <div class="tab">
        <span
          @click="cur=0"
          :style="{'color':(cur==0?'#6A2F73':''),'border-bottom':(cur==0?'1px solid #6A2F73':'')}"
        >注册</span>
        <span
          @click="cur=1"
          :style="{'color':(cur==1?'#6A2F73':''),'border-bottom':(cur==1?'1px solid #6A2F73':'')}"
        >登录</span>
      </div>
      <div class="content">
        <div class="con" v-show="cur==0">
          <div id="inp">
            <el-input v-model="phoneNumber" placeholder="请输入手机号码" style="position:relative"></el-input>
            <div class="mistakeCon" >{{mistakePhone}}</div>
          </div>
          <div id="inp">
            <el-input v-model="tryCode" placeholder="请输入验证码" style="position:relative">
              <span
                slot="suffix"
                class="getTryCode"
                @click="getTryCode"
                v-show="show"
                style="cursor:pointer"
              >获取验证码</span>
              <span slot="suffix" class="getTryCode" v-show="!show">{{count}}s后再次获取</span>
            </el-input>
            <div class="mistakeCon4" >{{judgeTryCode}}</div>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="pass">
              <div id="inp">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  placeholder="请输入登陆密码"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="checkPass">
              <div id="inp">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                  placeholder="再次确认密码"
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
          <div id="inp">
            <el-checkbox v-model="checked" @change="onChange">
              我已经阅读并同意
              <span style="color:#6A2F73">《北京市精诚公证处用户协议》</span>
            </el-checkbox>
          </div>
          <div class="reg">
            <el-button :disabled="flag" type="primary" @click="Reg">注册</el-button>
          </div>
          <!-- <div class="copy">
              Copyright © 北京市精诚公证处版权所有
              <br />京ICP备16045056号
          </div>-->
        </div>

        <!-- 登录 -->
        <div class="con" v-show="cur==1">
          <div id="inp">
            <el-input v-model="pn" placeholder="请输入手机号码"></el-input>
          </div>
          <div id="inp">
            <el-input v-model="tc" placeholder="请输入验证码">
              <span slot="suffix" class="getTryCode">
                <img :src="image" alt @click="getImgCode" />
              </span>
            </el-input>
          </div>
          <div id="inp">
            <el-input v-model="loginPw" placeholder="请输入登陆密码" type="password"></el-input>
          </div>
          <div class="forget">
            <span @click="forgrtPw">密码找回？</span>
          </div>
          <!-- 忘记密码内容 -->
          <div class="forgetPwCon" v-if="appear==0">
            <div class="content">
              <div class="top">
                <span>密码重置</span>
                <span @click="appear=1">
                  <i class="el-icon-circle-close" ></i>
                </span>
              </div>
              <div class="con">
                <div id="inp">
                  <el-input v-model="phoneNumber" placeholder="请输入手机号码" style="position:relative"></el-input>
                  <div class="mistakeCon" >{{mistakePhone}}</div>
                </div>

                <el-form
                  :model="ruleForm"
                  status-icon
                  :rules="rules"
                  ref="ruleForm"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="pass">
                    <div id="inp">
                      <el-input
                        type="password"
                        v-model="ruleForm.pass"
                        autocomplete="off"
                        placeholder="请输入密码"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="checkPass">
                    <div id="inp">
                      <el-input
                        type="password"
                        v-model="ruleForm.checkPass"
                        autocomplete="off"
                        placeholder="再次确认密码"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-form>

                <div id="inp">
                  <el-input v-model="tryCode" placeholder="请输入验证码" style="position:relative">
                    <span
                      slot="suffix"
                      class="getTryCode"
                      @click="getTryCode2"
                      v-if="show2"
                      style="cursor:pointer"
                    >获取验证码</span>
                    <span slot="suffix" class="getTryCode" v-else>{{count}}s后再次获取</span>
                  </el-input>
                  <div class="mistakeCon" id="mis">{{judgeTryCode}}</div>
                </div>
                <div class="forgotBtn" @click="submitNewPw">确定</div>
              </div>
            </div>
          </div>

          <div class="reg" @click="login">
            <el-button id="btnn">登录</el-button>
          </div>
          <div class="reg">
            <el-divider>
              <span>or</span>
            </el-divider>
            <el-button id="btnn" @click.native="goWechat">
              <img src="../assets/wx.png" alt />
              微信快速登录
            </el-button>
          </div>

          <!-- <div class="copy active">
              Copyright © 北京市精诚公证处版权所有
              <br />京ICP备16045056号
          </div>-->
        </div>
      </div>
    </div>

    <!-- 弹出框绑定手机号 -->
    <div class="pop" v-if="pop">
      <div class="cont">
        <p class="phone">
          <el-input v-model="phoneNumber" placeholder="请输入手机号码"></el-input>
            <div class="mistakeCon3" >{{mistakePhone}}</div>
        </p>
        <p class="code">
          <el-input v-model="tryCode" placeholder="请输入验证码"></el-input>
          <span    slot="suffix"
                      @click="getTryCode3"
                      v-if="show2"
                      style="cursor:pointer">获取验证码</span>
           <span slot="suffix" class="getTryCode" v-else>{{count}}s后再次获取</span>
             <div class="mistakeCon2" style="">{{judgeTryCode}}</div>
        </p>
          <div class="btnn" @click="sure">确定</div>
      </div>

    </div>
  </div>
</template>
<script>
import {
  reg,
  getCode,
  Login,
  getImageCode,
  getCode2,
  submitNewInfo,
  getToken,
  catchInfo,
  getCode3
} from "../api/request";
import Cookies from "js-cookie";
import qs from "qs";
import { getUrlParam } from "../api/utils";
import {_local} from '../api/storage'
export default {
  data() {
    // 密码以及密码二次验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        this.mistakePw == false;
      } else if (value.length < 6) {
        callback(new Error("密码不能少于六位"));
        this.mistakePw == false;
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        this.mistakePw = false;
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
        this.mistakePw = false;
      } else {
        callback();
        this.mistakePw = true;
      }
    };
    return {
      pop:false,
      // pop:true,

      appear: 1,
      cur: 0,
      // 注册表单信息
      phoneNumber: "",
      tryCode: "",
      pw: "",
      secondPw: "",
      checked: "",
      // 登录得表单信息
      pn: "",
      tc: "",
      loginPw: "",
      // 获取验证码
      show: true,
      show2: true,

      count: "",
      flag: true,
      //  正则验证错误提示
      mistakePhone: "",
      judgePhone: "",
      // 密码相关
      password: "",
      mistakePw: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      judgeTryCode: "",
      judgeTryCode2: "",
      // 图片验证码
      image: "",
      uid: "",
    };
  },
  watch: {
    // watch监听正则验证手机号
    phoneNumber(newVal, oldVal) {
      if (
        !/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/.test(
          newVal
        )
      ) {
        this.mistakePhone = "号码格式错误";
        this.judgePhone = false;
      } else {
        this.mistakePhone = "";
        this.judgePhone = true;
      }
    },
    // 验证码
    tryCode(newVal, oldVal) {
      // console.log(newVal.length);
      if (newVal.length < 6 || newVal.length > 6) {
        this.judgeTryCode = "验证码格式错误";
        this.judgeTryCode2 = false;
      } else if (newVal.length == 6) {
        this.judgeTryCode = "";
        this.judgeTryCode2 = true;
      }
    },
    $route: {
      handler: function (val, oldVal) {
        console.log(val, this.$route);
      },
      // 深度观察监听
      deep: true,
    },
  },
  mounted() {
    //整个逻辑就是
    //一开始进入页面判断网址中存在不存在code,如果不存在先不进行操作（等后边点击微信快速登录按钮在进行唤醒微信授权，微信服务器返回code，截取code,传code,...）。
    // 如果存在说明已经受过权了，截取code,传给后端，根据
    //返回code码做操作，如果返回10001==绑定手机号，说明第一次微信登录，进行手机号绑定。如果回复10000说明不是第一次微信登陆，已经绑定过手机号了
    //后端会在这一次返回用户信息以及token,存储token（用于全局路由判断）,用户信息用于后面表单页面操作。。
    let href = window.location.href;
    let isURL = href.indexOf("code=") === -1;
    if (isURL) {
      console.log('没code,没授权')
    } else {
      console.log('有code授权了')
      let href = window.location.href;
      var queryString = href.substring(href.indexOf("?") + 1);
      var parameters = queryString.split("&");
      let code = qs.parse(parameters[0]);
      let info = {
        code: code.code,
      };
// 将code传给后端，换取code
      getToken(qs.stringify(info)).then((res) => {
        if (res.code == 10001) {
          this.pop = true;
          this.openid=res.data
        localStorage.setItem("openid", JSON.stringify(res.data));
        } if(res.code==10000){
              this.$message({
              showClose: true,
              message: res.msg,
              customClass: "mess",
              offset: 300,
              type: "success",
          });
               localStorage.setItem("userInfo",JSON.stringify(res.data) );
              //  再次使用微信登录成功之后将token存入cookie,用于全局路由钩子函数的判断
            //  localStorage.setItem("Token",res.data.token,{ expires: 1 })
              _local.set('user', res.data.token, 1000*60*60*24);
              this.$router.push('/info')
        }
          else {
          this.$message({
            showClose: true,
            message: res.msg,
            customClass: "mess",
            offset: 300,
          });
        }
      });
      localStorage.setItem("code", JSON.stringify(code));
      // console.log("wxcode:", JSON.stringify(code))
    }
  },
  methods: {
    //微信授权登录，调起微信
    goWechat() {
      const appid = "wxf1a23a96e4bbf902";
      const redirect_uri = encodeURIComponent("http://ngrok.sscai.club");
      const scope = "snsapi_userinfo";
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect `;
    },
    // 第一次使用微信授权登录绑定成功之后 弹框微信绑定手机号，验证码的   确定按钮
    sure(){
          let info={
            phone:this.phoneNumber,
            code:this.tryCode,
            openid:this.openid
          }
          // console.log(info)
          catchInfo(info).then(res=>{
            // console.log(res)
      // 绑定成功
            if(res.code==0){
           this.$message({
            showClose: true,
            message: res.msg,
            customClass: "mess",
            offset: 300,
             type: "success",
          });
          // 弹框消失
            this.pop=false
            // 绑定成功操作++++++++++++++++++++++++++++++++++++++++++++++++++
            this.phoneNumber=''
            this.tryCode=''

// 第一次使用微信授权登录绑定成功之后
 localStorage.setItem("userInfo",JSON.stringify(res.data) );

       //  微信登录成功之后将token存入cookie,用于全局路由钩子函数的判断
              // localStorage.setItem("Token",res.data.token,{ expires: 1 })
  _local.set('user', res.data.token, 1000*60*60*24) ;
 this.$router.push('/info')
            }else{
            this.$message({
            showClose: true,
            message: res.msg,
            customClass: "mess",
            offset: 300,
          });
            }
          })
    },
    // 复选框得值变化
    onChange(value) {
      //  console.log(value)
      if (
        value === true &&
        this.judgePhone == true &&
        this.mistakePw == true &&
        this.judgeTryCode2 == true
      ) {
        this.flag = false;
        // console.log(this.flag)
      } else {
        this.flag = true;
      }
    },
    // 获取验证码倒计时以及获取
    getTryCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        // 调用获取验证码得接口
        let info = {
          phone: this.phoneNumber,
        };
        getCode3(qs.stringify(info)).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$message({
              type: "seccess",
              showClose: true,
              message: res.msg,
              type: "success",
              customClass: "mess",
              offset: 200,
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,

              customClass: "mess",
              offset: 200,
            });
          }
        });
        //  点击之后进入倒计时
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    // 忘记密码里获取验证码倒计时以及获取
    getTryCode2() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show2 = false;
        // 调用获取验证码得接口
        let info = {
          phone: this.phoneNumber,
        };
        getCode2(qs.stringify(info)).then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.$message({
              type: "seccess",
              showClose: true,
              message: res.msg,
              type: "success",
              customClass: "mess",
              offset: 200,
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              customClass: "mess",
              offset: 200,
            });
          }
        });
        //  点击之后进入倒计时
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show2 = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

        // 忘记密码里获取验证码倒计时以及获取
    getTryCode3() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show2 = false;
        // 调用获取验证码得接口
        let info = {
          phone: this.phoneNumber,
        };
        getCode3(qs.stringify(info)).then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.$message({
              type: "seccess",
              showClose: true,
              message: res.msg,
              type: "success",
              customClass: "mess",
              offset: 200,
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              customClass: "mess",
              offset: 200,
            });
          }
        });
        //  点击之后进入倒计时
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show2 = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 注册表单信息提交，确保表单里的所有都是正确的才可以提交后台
    Reg() {
      if (
        this.flag === false &&
        this.judgePhone == true &&
        this.mistakePw == true &&
        this.judgeTryCode2 == true
      ) {
        let info = {
          phone: this.phoneNumber,
          password: this.ruleForm.pass,
          code: this.tryCode,
        };
        // console.log(info);
        reg(info).then((res) => {
          if (res.msg == "注册成功！") {
            localStorage.setItem("userInfo", JSON.stringify(info));
            _local.set('user', res.data.token, 1000*60*60*24);
            this.$message({
              showClose: true,
              message: res.msg + "3s后跳转到申请表页面",
              type: "success",
              customClass: "mess",
              offset: 200,
            });
            setTimeout(() => {
              this.$router.push("/info");
            }, 3000);
          } else {
            this.$message({
              message: res.msg,
              offset: 200,
              showClose: true,
            });
          }
        });
      } else {
        this.$message({
          message: "信息有误",
          offset: 200,
          showClose: true,
        });
      }
    },

    // 登录
    login() {
      let info = {
        phone: this.pn,
        password: this.loginPw,
        uuid: this.uid,
        code: this.tc,
      };
      // console.log(info);
      Login(info).then((res) => {
        // console.log(res);
        if (res.msg == "登录成功！") {
          localStorage.setItem("userInfo", JSON.stringify(info));
          _local.set('user', res.data.token, 1000*60*60*24);
          // _local.set('user', res.data.token, 10000);

          this.$message({
            showClose: true,
            message: res.msg + "跳转到申请表页面",
            type: "success",
            customClass: "mess",
            offset: 200,
          });

            this.$router.push("/info");

        } else if (res.msg == "验证码错误") {
          this.$message({
            message: res.msg,
            offset: 200,
            showClose: true,
          });
          this.getImage();
        } else {
          this.$message({
            message: res.msg,
            offset: 200,
            showClose: true,
          });
        }
      });
    },
    getImage() {
      getImageCode().then((res) => {
        this.image = "data:image/png;base64," + res.img;
        this.uid = res.uuid;
      });
    },
    getImgCode() {
      this.getImage();
    },
    // 忘记密码
    forgrtPw() {
      this.appear = 0;
      // this.$forceUpdate()
      this.phoneNumber = "";
      this.ruleForm.pass = "";
      this.ruleForm.checkPass = "";
      this.tryCode = "";
      this.mistakePhone = "";
      this.judgeTryCode = "";
    },
    submitNewPw() {
      if (
        this.judgePhone == true &&
        this.mistakePw == true &&
        this.judgeTryCode2 == true
      ) {
        {
          let info = {
            phone: this.phoneNumber,
            password: this.ruleForm.pass,
            code: this.tryCode,
          };
          submitNewInfo(info).then((res) => {
            if (res.msg == "密码重置成功！") {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success",
                customClass: "mess",
                offset: 200,
              });
              this.appear = 1;
            } else {
              this.$message({
                message: res.msg,
                offset: 200,
                showClose: true,
              });
              this.appear = 0;
            }
            console.log(res);
          });
        }
      } else {
        this.$message({
          message: "信息有误",
          offset: 200,
          showClose: true,
        });
      }
    },
  },
  created() {
    this.getImage();
         if (!_local.get('user') ) {  // 通过vuex state获取当前的token是否存在
       this.$message({
          message: "登录失效，请重新登录",
          offset: 200,
          showClose: true,
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  position: relative;
  height: auto;
  .top {
    width: 100%;
    height: 350px;

    img {
      width: 100%;
    }
  }
}
.pop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 999;
  .cont {
    width: 600px;
    height: 420px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -90px;
    background-color: white;
      .btnn{
    width: 300px;
    margin: auto;
    height: 70px;
    background-color:#6a2f73 ;
    text-align: center;
    line-height: 70px;
    color: white;
  }
  }

}
.right {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  width: 700px;
  height: 800px;
  background-color: white;
  position: absolute;
  left: 50%;
  margin-left: -350px;
  border-radius: 10px;
  top: 450px;
  .tab {
    width: 500px;
    height: 90px;
    border-bottom: 1px solid gainsboro;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 30px;
    font-size: 30px;
    text-align: center;
    line-height: 90px;
    color: #666666;
    span {
      display: inline-block;
      width: 48%;
      height: 100%;
      // border-bottom: 1px solid;
      cursor: pointer;
    }
  }
  .content {
    .con {
      width: 550px;
      height: 400px;
      // border: 1px solid;
      position: absolute;
      left: 50%;
      margin-left: -275px;
      top: 120px;
      .reg {
        color: white;
        margin: 45px auto;
        border-radius: 5px;
        text-align: center;
      }
    }
  }
}
.getTryCode {
  font-size: 22px;
  color: #6a2f73;
  img {
    width: 150px;
    margin-top: -18px;
  }
}
.forget {
  width: 350px;
  height: 70px;
  font-size: 20px;
  line-height: 70px;
  text-align: right;
  margin-left: 180px;
  color: #6a2f73;
  cursor: pointer;
}
.forgetPwCon {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 999;
  .content {
    width: 590px;
    height: 670px;
    position: absolute;
    background-color: white;
    border-radius: 10px;
    top: 50%;
    margin-top: -325px;
    left: 50%;
    margin-left: -285px;
    overflow: hidden;
    .top {
      width: 100%;
      height: 70px;
      background-color: #6a2f73;
      color: white;
      line-height: 70px;
      span {
        display: inline-block;
        width: 48%;
        text-indent: 1em;
      }
      span:nth-child(2) {
        text-align: right;
        font-size: 25px;
      }
    }
  }
}
.forgotBtn {
  width: 170px;
  height: 70px;
  background-color: #6a2f73;
  margin: 40px auto;
  border-radius: 3px;
  line-height: 70px;
  color: white;
  text-align: center;
}
.mistakeCon {
  // position: absolute;
  font-size: 18px;
  margin-left: 30px;
  color: #f56c6c;
  top: 58px;
}
.mistakeCon4 {
  // position: absolute;
  font-size: 18px;
  margin-left: 30px;
  color: #f56c6c;
  top: 78px;
}

.mistakeCon2 {
  position: absolute;
  font-size: 18px;
  margin-left: 50px;
  color: #f56c6c;
  top: 240px;
}
.mistakeCon3 {
  position: absolute;
  font-size: 18px;
  margin-left: 50px;
  color: #f56c6c;
  top: 120px;
}
.phone,
.code {
  width: 490px;
  margin: 60px auto;
}
.code {
  span {
    display: inline-block;
    width: 140px;
    height: 60px;
    border: 1px solid #dddddd;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
  }
}
.top{
  span{
    font-size: 24px;
  }
}
</style>
<style lang="scss">
.reg {
  .el-button {
    width: 280px;
    height: 70px;
    background: #6a2f73;
    border: none;
    color: white;
    font-size: 24px;
  }
  img {
    width: 35px;
    vertical-align: middle;
  }
  .el-divider__text {
    font-size: 24px;
  }
}
.el-message.is-closable .el-message__content {
  font-size: 20px;
}
.el-form-item.is-error .el-input__validateIcon {
  font-size: 20px;
}
.el-form-item--feedback .el-input__validateIcon {
  font-size: 20px;
}

.el-form-item__error {
  font-size: 18px;
  left: 30px;
}
.el-form-item:nth-child(2) {
  margin-top: -15px;
}
#inp {
  padding-top: 45px;
  // margin-top: 60px;
  .el-input__inner {
    width: 500px;
    border: none;
    border-bottom: 1px solid #e2e2e2;
    border-radius: 0px;
    font-size: 24px;
    // margin-left: 50px;
  }

  .el-input {
    width: 500px;
    margin-left: 25px;
    line-height: 40px;
  }
  .el-checkbox__inner::after {
    top: 10px;
    left: 10px;
    width: 5px;
  }
  .el-checkbox__inner {
    width: 30px;
    height: 30px;
    border: 1px solid gainsboro;
  }
  .el-checkbox__input {
    width: 30px;
    height: 30px;
  }
  .el-checkbox:last-of-type {
    width: 350px;
    border: none;
    margin-top: 25px;
    border-radius: 0px;

    margin-left: 30px;
  }

  .el-checkbox__label {
    font-size: 20px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #6a2f73;
    border: none;
  }
}
.reg {
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    width: 350px;
    height: 80px;
    border: none;
    font-size: 30px;
    background-color: #6a2f73;
    // background-color: #D2D2D2;
    opacity: 0.5;
  }
  .el-button--primary {
    width: 350px;
    height: 80px;
    border: none;
    background-color: #6a2f73;
    font-size: 30px;
  }
}
.phone {
  .el-input,
  .el-input__inner {
    display: inline-block;
    width: 450px;
    height: 60px;
    font-size: 22px;
  }
}
.code {
  .el-input,
  .el-input__inner {
    display: inline-block;
    width: 300px;
    height: 60px;
    font-size: 22px;
  }
}

</style>

// 和推荐相关的接口处理
import axios from '../utils/axios.js'
let base = 'http://192.168.40.120:10010/api'
// let base='http://localhost:8081/api'
//注册
export const reg = params => { return axios.post(`${base}/user/reg`, params) }
//登录
export const Login = params => { return axios.post(`${base}/user/login`, params) }
// 获取验证码
// export const getCode = params => { return axios.post(`${base}/phone/code`,  params ) }
export const getCode = params => { return axios.get(`${base}/phone/code?${params}`, params) }
// 获取验证码（忘记密码里）
export const getCode2 = params => { return axios.get(`${base}/findPass/code?${params}`, params) }
// 获取图片验证码
// 加时间戳防止ie浏览器缓存，验证码不更新
export const getImageCode = params => { return axios.get(`${base}/captchaImage?time=${new Date().getTime()}`, params) }

// 提交表单
export const submitInformation = params => { return axios.post(`${base}/applicant/add`, params) }
// 查询http://192.168.40.120:8081/api
export const search = params => { return axios.post(`${base}/applicant/list`, params) }
//查询详情
export const searchDetail = params => { return axios.get(`${base}/applicant/edit/${params}`, params) }
// 获取省市区
// http://192.168.40.120:8081/api

export const getProvince = params => { return axios.get(`${base}/province`, params) }
//市
// http://192.168.40.120:8081/api/city/110000
export const getCity = params => { return axios.get(`${base}/city/${params}`, params) }
//获取县区
// http://192.168.40.120:8081/api/county/110100
export const getRegion = params => { return axios.get(`${base}/county/${params}`, params) }

//修改表单
export const editInfo = params => { return axios.post(`${base}/applicant/edit`, params) }

//忘记密码
export const submitNewInfo = params => { return axios.post(`${base}/user/resetPassWord`, params) }

//提交最后确定下来的得表单信息

export const submitLastInfo = params => { return axios.get(`${base}/applicant/submit/${params}`, params) }

//获取assionToken
export const getToken = params => { return axios.get(`${base}/wechat/oauth2/access_token?${params}`, params) }
//绑定手机号
export const catchInfo= params => { return axios.post(`${base}/user/bangding`, params) }

// 获取验证码
// export const getCode = params => { return axios.post(`${base}/phone/code`,  params ) }
export const getCode3 = params => { return axios.get(`${base}/phone/bangdingcode?${params}`, params) }

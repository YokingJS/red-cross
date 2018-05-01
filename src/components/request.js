import fetch from 'isomorphic-fetch';

let getRequest = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  });
};

let getInitInformation = () => {
  return getRequest('http://118.123.167.142:9090/getInitInformation');
};

let getDeployAppealList = () => {
  return getRequest('http://118.123.167.142:9090/getDeployAppealList?index=0&size=10000');
};

let requestWechatCode = () => {
  let locationHref = window.location.href;
  let redirect_uri = 'http%3a%2f%2fpt.jiaziworld.com';
//   getRequest('https://open.weixin.qq.com/connect/qrconnect?appid=wx85e543017679058f&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');
  return getRequest('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85e543017679058f&redirect_uri=http%3a%2f%2fpt.jiaziworld.com%2fWebs%2fGetMemberCode.aspx&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1');
};
 
let request =  {
  getInitInformation: getInitInformation,
  requestWechatCode: requestWechatCode,
  getDeployAppealList: getDeployAppealList
};

export default request;
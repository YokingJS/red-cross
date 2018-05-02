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

let postRequest = (url, param) => {
  return fetch(url, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({'data': param})
  }).then(res => {
    return res.json();
  });
};

let getInitInformation = () => {
  return getRequest('//118.123.167.142:9090/getInitInformation');
};

let getDrftAppealList = () => {
  return getRequest('//118.123.167.142:9090/getDrftAppealList?index=0&size=10000');
};

let getDonateOrderList= () => {
  return getRequest('//118.123.167.142:9090/getDonateOrderList?index=0&size=10000');
};

let requestWechatCode = () => {
  let locationHref = window.location.href;
  let redirect_uri = 'http%3a%2f%2fpt.jiaziworld.com';
//   getRequest('https://open.weixin.qq.com/connect/qrconnect?appid=wx85e543017679058f&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');
  return getRequest('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85e543017679058f&redirect_uri=http%3a%2f%2fpt.jiaziworld.com%2fWebs%2fGetMemberCode.aspx&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1');
};

let saveAppealRecordNotDeploy = (param) => {
  return postRequest('//118.123.167.142:9090/saveAppealRecordNotDeploy', JSON.stringify(param));
};

let getDrftAppealById = (paramUrl) => {
  return getRequest('//118.123.167.142:9090/getDrftAppealById' + paramUrl);
};

let getDeployAppealById = (paramUrl) => {
  return getRequest('//118.123.167.142:9090/getDeployAppealById' + paramUrl);
};

let getOrderByCondition = (paramUrl) => {
  return getRequest('//118.123.167.142:9090/getOrderByCondition' + paramUrl);
};

let request =  {
  getInitInformation: getInitInformation,
  requestWechatCode: requestWechatCode,
  getDrftAppealList: getDrftAppealList,
  saveAppealRecordNotDeploy: saveAppealRecordNotDeploy,
  getDrftAppealById: getDrftAppealById,
  getDeployAppealById: getDeployAppealById,
  getOrderByCondition: getOrderByCondition,
  getDonateOrderList: getDonateOrderList
};

export default request;
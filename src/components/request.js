import fetch from 'isomorphic-fetch';

const HOST_PORT = '//47.92.75.66:80';

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
    body: param
  }).then(res => {
    return res.json();
  });
};

let getInitInformation = () => {
  return getRequest(HOST_PORT + '/getInitInformation');
};

let getDrftAppealList = () => {
  return getRequest(HOST_PORT + '/getDrftAppealList?index=0&size=10000');
};

let getDonateOrderList= () => {
  return getRequest(HOST_PORT + '/getDonateOrderList?index=0&size=10000');
};

let requestWechatCode = () => {
  let locationHref = window.location.href;
  let redirect_uri = 'http%3a%2f%2fpt.jiaziworld.com';
//   getRequest('https://open.weixin.qq.com/connect/qrconnect?appid=wx85e543017679058f&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');
  return getRequest('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85e543017679058f&redirect_uri=http%3a%2f%2fpthh.svell.cn&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1');
};

let saveAppealRecordNotDeploy = (param) => {
  return postRequest(HOST_PORT + '/saveAppealRecordNotDeploy', JSON.stringify(param));
};

let saveAppealRecordDeploy = (param) => {
  return postRequest(HOST_PORT + '/saveAppealRecordDeploy', JSON.stringify(param));
}

let getDrftAppealById = (paramUrl) => {
  return getRequest(HOST_PORT + '/getDrftAppealById' + paramUrl);
};

let getDeployAppealById = (paramUrl) => {
  return getRequest(HOST_PORT + '/getDeployAppealById' + paramUrl);
};

let getOrderByCondition = (paramUrl) => {
  return getRequest(HOST_PORT + '/getOrderByCondition' + paramUrl);
};

let getTotalStatisticsData = () => {
  return getRequest(HOST_PORT + '/getTotalStatisticsData');
};

let undeployAppealRecord = (paramUrl) => {
  return getRequest(HOST_PORT + '/undeployAppealRecord' + paramUrl);
};

let request =  {
  getInitInformation: getInitInformation,
  requestWechatCode: requestWechatCode,
  getDrftAppealList: getDrftAppealList,
  saveAppealRecordDeploy: saveAppealRecordDeploy,
  saveAppealRecordNotDeploy: saveAppealRecordNotDeploy,
  getDrftAppealById: getDrftAppealById,
  getDeployAppealById: getDeployAppealById,
  getOrderByCondition: getOrderByCondition,
  getDonateOrderList: getDonateOrderList,
  getTotalStatisticsData: getTotalStatisticsData,
  undeployAppealRecord: undeployAppealRecord
};

export default request;
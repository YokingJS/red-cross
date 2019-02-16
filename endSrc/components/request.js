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

let getBrandWCPayRequest = (data, callback) => {
  let WeixinJSBridge = window.WeixinJSBridge;

  function onBridgeReady(){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": "wx85e543017679058f",  
            "timeStamp": data.timestamp || '', 
            "nonceStr": data.nonce || '', 
            "package": data.packageName || '',     
            "signType": "MD5",
            "paySign": data.signature || '' //微信签名 
        },
        (res) => {     
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              callback();
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        }
    ); 
  }
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  }else{
    onBridgeReady();
  }
};

let unifiedOrder = (param) => {
  return postRequest(HOST_PORT + '/unifiedOrder', JSON.stringify(param));
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

let insertBannerImage = (param) => {
  return postRequest(HOST_PORT + '/insertBannerImage', JSON.stringify(param));
};

let getOrderById = (paramUrl) => {
  return getRequest(HOST_PORT + '/getOrderById' + paramUrl);
};

let deleteBannerImageById = (paramUrl) => {
  return getRequest(HOST_PORT + '/deleteBannerImageById' + paramUrl);
};

let deleteAppealRecordById = (paramUrl) => {
  return getRequest(HOST_PORT + '/deleteAppealRecordById' + paramUrl);
};

let setAppealRecordTop = (paramUrl) => {
  return getRequest(HOST_PORT + '/setAppealRecordTop' + paramUrl);
};

let unsetAppealRecordTop = (paramUrl) => {
  return getRequest(HOST_PORT + '/unsetAppealRecordTop' + paramUrl);
};

let deleteOrderById = (paramUrl) => {
  return getRequest(HOST_PORT + '/deleteOrderById' + paramUrl);
};

let insertOrderRecord = (param) => {
  return postRequest(HOST_PORT + '/insertOrderRecord', JSON.stringify(param));
}

let request =  {
  getInitInformation: getInitInformation,
  unifiedOrder: unifiedOrder,
  getDrftAppealList: getDrftAppealList,
  saveAppealRecordDeploy: saveAppealRecordDeploy,
  saveAppealRecordNotDeploy: saveAppealRecordNotDeploy,
  getDrftAppealById: getDrftAppealById,
  getDeployAppealById: getDeployAppealById,
  getOrderByCondition: getOrderByCondition,
  getDonateOrderList: getDonateOrderList,
  getTotalStatisticsData: getTotalStatisticsData,
  undeployAppealRecord: undeployAppealRecord,
  getBrandWCPayRequest: getBrandWCPayRequest,
  insertBannerImage: insertBannerImage,
  getOrderById: getOrderById,
  deleteBannerImageById: deleteBannerImageById,
  deleteAppealRecordById: deleteAppealRecordById,
  deleteOrderById: deleteOrderById,
  insertOrderRecord: insertOrderRecord,
  setAppealRecordTop: setAppealRecordTop,
  unsetAppealRecordTop: unsetAppealRecordTop
};

export default request;
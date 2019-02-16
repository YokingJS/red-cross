import React from 'react';
import ReactDOM from 'react-dom'
import ReactPullLoad,{ STATS } from 'react-pullload';
import ListItem from '../list-item';
import { Button } from 'antd-mobile';
import request from '../../../service';
import '../../../node_modules/react-pullload/dist/ReactPullLoad.css';
// import mock from '../../../mock/index';
// let newMock = mock.data;

const pageUrl = window.location.href || '';
const requestId = (pageUrl.split('id=') || []).pop() || '';

class PageTitle extends React.Component {
  constructor(){
    super();

    this.state ={
      hasMore: true,
      data: [],
      index: 1,
      action: STATS.init
    }
  }

  componentWillMount() {
    this.getPageInfo();
  }

  getPageInfo = () => {
    let { index = 1, data = [] } = this.state

    const dealResule = (resS) => {

      this.setState({
        data: data.concat(resS),
        index: ++index,
        action: STATS.reset
      }, () => {
          console.log('index:', index);
      });
    };
    // newMock.push(mock.data[index] || []);

    // dealResule(newMock);
    request.getOrderByAppealRecordId(`?id=${requestId}&index=${index}&size=200`).then(resS => {
      if(!resS.errorMsg) {
        dealResule(resS.data || []);
      }
    });
  }

  handleAction = (action) => {

    if(action === this.state.action){
        return false
    }
    
    if(action === STATS.refreshing){
        return;
    } else if(action === STATS.loading){
        this.handLoadMore();
    } else{
        //DO NOT modify below code
        this.setState({
        action: action
        })
    }
  }
     
  handLoadMore = () => {

    if(STATS.loading === this.state.action){
      return false
    }
    
    setTimeout(() => {
      this.getPageInfo();
    }, 1000);
    this.setState({
      action: STATS.loading
    })
  }
      
      render(){

        const { data, hasMore } = this.state

        return (
          <div style={{paddingTop: '15px'}}>
            {
              data.map(item => {
                return (<ListItem data={item} />);
              })
            }
          </div>
          // <ReactPullLoad 
          //   action={this.state.action}
          //   handleAction={this.handleAction}
          //   hasMore={false}
          //   style={{paddingTop: 5}}
          // >
          //   {
          //     data.map(item => {
          //       return (<ListItem data={item} />);
          //     })
          //   }
          //   <div style={styles.moreBox}>
          //     {/* <Button onClick={this.handLoadMore} style={styles.loadMore}>加载更多(手机端无需点击)</Button> */}
          //   </div>
          // </ReactPullLoad>
        )
      }    
}

export default PageTitle;

const styles = {
  pageMain: {
    display: 'flex',
    flexDirection: 'row',
    height: '0.5rem'
  },
  moreBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadMore: {
    width: '4rem',
    height: '0.6rem',
    fontSize: '0.24rem',
    lineHeight: '0.6rem'
  }
};
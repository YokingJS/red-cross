
import React from 'react';

import DonorItem from '../donorItem/index';

class Donors extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      appealRecordList: this.props.data || []
    };
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      appealRecordList: nextprops.data || []
    });
  }

  render() {
    const { appealRecordList = [] } = this.state || {};
    return (
      <div style={styles.donors}>
        {
          appealRecordList.map((item, index) => {
            return (
              <DonorItem
                key={index}
                data={item}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Donors;

const styles = {
  donors: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #999999'
  }
};
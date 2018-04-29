
import React from 'react';

import DonorItem from '../donorItem/index';

class Donors extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={styles.donors}>
        {
          [1,2,3,4,5,6].map((item, index) => {
            return (
              <DonorItem
                key={index}
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

import React from 'react';

class LayOut extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps.visible);
//     this.setState({
//       visible: nextProps.visible || false
//     });
//   }

  render() {
    return (
      (this.props.data || {}).isVisible ? <div>
        {this.props.children}
      </div> : <div/>
    );
  }
}

export default LayOut;

const styles = {};
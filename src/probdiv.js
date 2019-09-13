import React, { Component } from 'react'
class probdiv extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <div>
          <div>
          <PieChart dataset={this.state.dataset} />
          </div>
          <div> {} </div>
        </div>
      );
    }
  }
  export default probdiv;
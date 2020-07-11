import React, { Component } from 'react';

class Try extends Component {


  render() {
    return (
      <>
        <li key={this.props.value.key + this.props.value.value}><b>{this.props.value.key}</b> - {this.props.value.value}</li>
      </>
    );
  };
}

export default Try;
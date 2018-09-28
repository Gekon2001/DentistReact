import React, { Component } from 'react';


class ModalError extends Component {

  render() {
  	return (
      <div className="modal">
        <div className="modal__mask">
        </div>
        <div className="modal__body">
          <div className="modal__header">
            Error happen while fething data, message: <span>{this.props.error.message}</span>
          </div>
          <div className="modal__text">
            Description: <span>{this.props.error.description}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalError;
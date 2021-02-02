import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button } from '@material-ui/core';
import ModalContext from 'contexts/modalContext';
import  './SimpleModal.scss';

class SimpleModal extends  React.Component {
    constructor (props) {
      super(props);
    }
    body = () => {
        <div>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        </div>
    }
    render () {
        return (
          <ModalContext.Consumer>
            {(context)=> 
              <div>
                <Modal
                open={context.show}
                onClose={this.props.onClose || context.onToggle}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                  <div className={`modal-container ${this.props.className}`}>
                    <div className="modal-header">
                      {this.props.title}
                    </div>
                    <div className="modal-body">
                      {this.props.children}
                    </div>
                    <div className="modal-footer">
                      <Button size="small" variant="contained" color="primary" disableElevation onClick={this.props.onSub}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            }
          </ModalContext.Consumer>
        );
    }
  
}
SimpleModal.contextType = ModalContext;
SimpleModal.propTypes = {
    className: PropTypes.string,
    // title: PropTypes.string,
    // labels: PropTypes.array,
    // gridkey: PropTypes.string,
    // filter_dict: PropTypes.object
};
  
SimpleModal.defaultProps = {
    className: '',
    title: '',
    labels: [],
    gridkey: '',
    filter_dict: {}
};
export default SimpleModal;
// export default connect(null, {})(SimpleModal);
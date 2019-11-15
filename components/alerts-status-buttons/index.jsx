'use strict';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { patchAlert } from '../../actions/';
import AlertStatusButtonContainer from '../../containers/alerts-status-buttons';

class AlertsStatusButtons extends Component {
  constructor(props) {
    super(props);
  }

  handleSetStatusButton = (e) => {
    const uid = this.props.fetchedAlert.uid;
    const newStatus = e.target.getAttribute('data-status');
    this.props.patchAlert(uid, newStatus);
  }


  render() {
    const { fetchedAlert } = this.props;
    return (
      <div>
        <AlertStatusButtonContainer
          fetchedAlert={fetchedAlert}
          handleSetStatusButton={this.handleSetStatusButton}
        />
      </div>
    );
  }
}

AlertsStatusButtons.propTypes = {
  fetchedAlert: PropTypes.object.isRequired,
  patchAlert: PropTypes.func.isRequired,
};

export default connect(null, { patchAlert })(AlertsStatusButtons);

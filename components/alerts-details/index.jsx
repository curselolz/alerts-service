import { PropTypes, PureComponent } from 'react';
import { getAlert } from '../../actions/alerts';
import { connect } from 'react-redux';
import AlertDetailsContainer from '../../containers/alerts-details';

class AlertDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    const { getAlert, params } = this.props;
    getAlert(params.id);
  }

  componentDidMount() {
    const { getAlert, params } = this.props;
    getAlert(params.id);
  }

  redirectToDashboard = () => {
    location.assign('/')
  }

  render ( ) {
    const alert = this.props.fetchedAlert;
    return (
      <AlertDetailsContainer
        alert={alert}
        redirectToDashboard={this.redirectToDashboard}
      />
    )
  }
}

const mapStateToProps = ({ alerts }) => ({
  fetchedAlert:alerts.fetchedAlert,
});

AlertDetails.propTypes = {
  getAlert: PropTypes.func.isRequired,
  fetchedAlert: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,
  { getAlert })(AlertDetails);

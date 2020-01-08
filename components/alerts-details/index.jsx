import { PropTypes, PureComponent } from 'react';
import { getAlert } from '../../actions/alerts';
import { connect } from 'react-redux';
import AlertDetailsContainer from '../../containers/alerts-details';
import { changeModalState } from '../../actions/alerts';

class AlertDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getAlert, params } = this.props;
    getAlert(params.id);
  }

  componentDidMount() {
    const { getAlert, params } = this.props;
    getAlert(params.id);
  }

  openModal = () => {
    const { changeModalState } = this.props;
    changeModalState(true);
  }

  render ( ) {
    const alert = this.props.fetchedAlert;
    const { fetchedAlert } = this.props;
    return (
        <AlertDetailsContainer
          alert={fetchedAlert ? fetchedAlert : {}}
          openModal={this.openModal}
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
  { getAlert, changeModalState })(AlertDetails);

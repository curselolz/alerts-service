import moment from 'moment';
import { Component, PropTypes } from 'react';
import { orderBy } from 'lodash';
import { getAllAlerts } from '../../actions/';
import { connect } from 'react-redux';
import AlertsPageContainer from '../../containers/alerts-page';
import { initTrackables } from '../../actions/init-application';
import { getAlerts } from '../../selectors/alerts';
import { AUDIO_LINK } from '../../constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/alerts.scss';

class AlertsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: this.props.alerts,
      filteredAlerts:[],
      paginatedAlerts: [],
      statusCheckboxes: {
        new: true,
        inHand: true,
        resolved: true,
        declined: true,
      },
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day'),
      searchInput: '',
      sortField:'status',
      sortOrder:'asc',
      alertLaterTimestamp: Math.round(Date.now() / 1000),
      currentPage: 0,
      pageCount: 1,
      alertsPerPage: 20
    };
    this.url = AUDIO_LINK;
    this.audio = new Audio(this.url);
  }

  componentDidMount() {
    const { getAllAlerts } = this.props;
    getAllAlerts(this.state.startDate, this.state.endDate);
    this.timer = setInterval(() => getAllAlerts(this.state.startDate, this.state.endDate), 5000);
    this.setState({ pageLoad: false });
    initTrackables();
  }


  componentWillMount() {
    this.filterAlerts();
    this.setState({ pageLoad: false });
    this.props.initTrackables();
  }

  async componentWillReceiveProps(nextProps) {
    let { alerts } = this.props;
    const newAlertArrived = _.filter(
      nextProps.alerts,
      alert => alert.createdTime > this.state.alertLaterTimestamp && alert.status === 'new').length > 0;
    if (newAlertArrived) {
      this.setState({ alertLaterTimestamp: Math.round(Date.now() / 1000) });
      let playAudio = this.audio.play();
        playAudio.then(_ => {
          // Autoplay started!
        }).catch(error => {
          // Autoplay was prevented.
        });
    }
    await this.setState({ alerts: nextProps.alerts });
    await this.filterAlerts();
    await this.sortRows(this.state.sortField, this.state.sortOrder);
    this.paginateAlerts();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
    let playAudio = this.audio.pause();
    if (typeof playAudio !== 'undefined') {
      playAudio.then(_ => {
        // Autoplay started!
      }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
    }
  }

  handleStatusCheckbox = async (e) => {
    let { statusCheckboxes } = this.state;
    statusCheckboxes[e.target.name] = e.target.checked
    await this.setState({ statusCheckboxes: statusCheckboxes})
    await this.filterAlerts()
    this.paginateAlerts()
  }

  handleSearchInput = async (e) => {
    await this.setState({searchInput: e.target.value})
    await this.filterAlerts()
    this.paginateAlerts()
  }

  handlePageChange = async (e) => {
    await this.setState({ currentPage: e.selected });
    this.paginateAlerts();
  }

  paginateAlerts = () => {
    let { filteredAlerts, alertsPerPage, currentPage } = this.state;
    let firstAlertIndex = currentPage * alertsPerPage;
    let lastAlertIndex = (currentPage + 1) * alertsPerPage;
    this.setState({
      paginatedAlerts: filteredAlerts.slice(firstAlertIndex, lastAlertIndex),
      pageCount: Math.ceil(filteredAlerts.length / alertsPerPage)
    });
  }

  handleDatePickerChange = range => {
    let { startDate, endDate } = range;
    startDate.startOf('day');
    endDate.endOf('day');
    this.setState({ 
      startDate, 
      endDate 
    });
    getAllAlerts(startDate, endDate);
  }

  filterAlerts = async () => {
    const { alerts,
      searchInput,
      statusCheckboxes,
      sortField,
      sortOrder
    } = this.state;
    let filteredAlerts = [];
    if (searchInput === "" || searchInput === null) {
      filteredAlerts = [...alerts];
    } else {
      filteredAlerts = alerts.filter(el => `${el.person.name} ${el.person.lastName}`.toLowerCase().match(searchInput.toLowerCase()));
    }
    filteredAlerts = filteredAlerts.filter(el => statusCheckboxes[el.status]);
    await this.setState({ filteredAlerts: filteredAlerts });
    this.sortRows(sortField, sortOrder);
  }

  sortRows = (sortField, sortOrder) => {
    const { filteredAlerts } = this.state;
    let sortedAlerts = [...filteredAlerts];
    let numericStatuses = { declined: 4, resolved: 3, inHand: 2, new: 1};
    if (sortField === 'status') {
      sortField = [el => numericStatuses[el.status]];
    }
    else if (sortField === 'name') {
      sortField = [el => el.person.name.toLowerCase()];
    }
    sortedAlerts = orderBy(sortedAlerts, sortField, sortOrder);

    this.setState({ filteredAlerts: sortedAlerts });
  }

  handleTableHeaderClick = async(event) => {
    const { sortField, sortOrder } = this.state;
    let eventData = event.currentTarget.getAttribute('data-sort');
    let triggerSortOrder = eventData === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    await this.sortRows(eventData, triggerSortOrder);
    this.setState({ sortField: eventData, sortOrder: triggerSortOrder });
    this.paginateAlerts();
  }

  detectOrderHeader = el => {
    const { sortField, sortOrder } = this.state;
    if (sortField === el.value) {
      if (sortOrder === 'asc') {
        return <i className="fa fa-caret-up"></i>
      } else {
        return <i className="fa fa-caret-down"></i>
      }
    }
  }

  render() {
    const {
      paginatedAlerts,
      statusCheckboxes,
      pageCount
    } = this.state;
    return (
      <AlertsPageContainer
        statusCheckboxes={statusCheckboxes}
        handleStatusCheckbox={this.handleStatusCheckbox}
        handleSearchInput={this.handleSearchInput}
        paginatedAlerts={paginatedAlerts}
        handleTableHeaderClick={this.handleTableHeaderClick}
        detectOrderHeader={this.detectOrderHeader}
        pageCount={pageCount}
        handlePageChange={this.handlePageChange}
        handleDatePickerChange={this.handleDatePickerChange}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  alerts: getAlerts(state),
})

AlertsPage.propTypes = {
  alerts: PropTypes.array.isRequired,
  getAllAlerts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
  { getAllAlerts, initTrackables })(AlertsPage);

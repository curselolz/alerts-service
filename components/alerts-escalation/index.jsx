import { PureComponent, PropTypes } from 'react';
import AlertEscalationContainer from '../../containers/alerts-escalation';
import { cvoFetch } from 'cvo-tools';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getRuleNew, getRuleInHand} from '../../selectors/escalation';
import { fetchAllRules, patchEscalationRule } from '../../actions/escalations';
import { getAllAlerts } from '../../actions/alerts';

class AlertEscalation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newRule: {
        enabled: false,
        term: 0,
        nextStepManager: '',
        usersToNotify: '',
        template: '',
        newAlertStatus:'',
      },
      inHandRule:{
        enabled: false,
        term: 0,
        nextStepManager: '',
        usersToNotify: '',
        template: '',
        newAlertStatus:''
      },
      selectedRule:'',
    };
  }
  componentWillReceiveProps(nextProps) {
      this.setState(prevState => ({
        inHandRule: {
          ...prevState.inHandRule,
          enabled: nextProps.inHandRule.enabled,
          term: nextProps.inHandRule.period,
          usersToNotify: nextProps.inHandRule.receivers,
          template: nextProps.inHandRule.template,
          nextStepManager: nextProps.inHandRule.contactManager.uid,
          newAlertStatus: nextProps.inHandRule.newAlertStatus,
          alertStatus: nextProps.inHandRule.alertStatus,
        },
        newRule: {
          ...prevState.newRule,
          enabled: nextProps.newRule.enabled,
          term: nextProps.newRule.period,
          usersToNotify: nextProps.newRule.receivers,
          template: nextProps.newRule.template,
          nextStepManager: nextProps.newRule.contactManager.uid,
          newAlertStatus: nextProps.newRule.newAlertStatus,
          alertStatus: nextProps.newRule.alertStatus,
        },
      }))
  }

  componentWillMount() {
    const { fetchAllRules } = this.props;
    fetchAllRules();
    cvoFetch('/api/users')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({users:data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  setForNewRule = (name, value) => {
    this.setState(prevState => ({
      selectedRule:'new',
      newRule: {
        ...prevState.newRule,
        [name]: value
      }
    }))
  }

  setUserNotify = value => {
    if(this.state.selectedRule === 'new') {
      this.setState(prevState => ({
        selectedRule: 'new',
        newRule: {
          ...prevState.newRule,
          usersToNotify: value
        }
      }))
    } else {
      this.setState(prevState => ({
        selectedRule: 'inHand',
        inHandRule: {
          ...prevState.inHandRule,
          usersToNotify: value
        }
      }))
    }
  }

  setForInHandRule = (name, value) => {
    this.setState(prevState => ({
      selectedRule:'inHand',
      inHandRule: {
        ...prevState.inHandRule,
        [name]: value
      }
    }))
  }

  sendData = (rule) => {
    const { newRule, inHandRule, selectedRule } = this.state;
    const { patchEscalationRule, getAllAlerts,  } = this.props;
    let ruleUid = selectedRule === 'new' ? this.props.newRule.uid : this.props.inHandRule.uid;
    let fetchedRule = rule === 'new' ? newRule : inHandRule;
    const { term, usersToNotify, enabled, nextStepManager, newAlertStatus, alertStatus, template } = fetchedRule;
    patchEscalationRule(ruleUid, {
      'period': term,
      'receivers': usersToNotify.toString().replace(/,/g, ';'),
      'enabled': enabled,
      'contactManagerUid': nextStepManager,
      'newAlertStatus': newAlertStatus,
      'alertStatus': alertStatus,
      'template': template,
    });
    getAllAlerts(moment().startOf('day'), moment().endOf('day'));
  }

  render() {
    const { users } = this.state;
    const { newRule, inHandRule } = this.props;
    return (
      <AlertEscalationContainer
        setForNewRule={this.setForNewRule}
        setForInHandRule={this.setForInHandRule}
        sendData={this.sendData}
        setUserNotify={this.setUserNotify}
        users={users}
        values={this.state}
        newRule={newRule}
        inHandRule={inHandRule}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  fetchedAlert: state.alerts.fetchedAlert,
  newRule: getRuleNew(state),
  inHandRule: getRuleInHand(state),
});


AlertEscalation.propTypes = {
  fetchedAlert:PropTypes.object.isRequired,
  newRule:PropTypes.object.isRequired,
  inHandRule:PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {
  patchEscalationRule,
  fetchAllRules,
  getAllAlerts,
})(AlertEscalation);
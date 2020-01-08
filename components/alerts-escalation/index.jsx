import { PureComponent, PropTypes } from 'react';
import AlertEscalationContainer from '../../containers/alerts-escalation';
import { cvoFetch } from 'cvo-tools';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import moment from 'moment';
import { getRuleNew, getRuleInHand} from '../../selectors/escalation';
import { fetchAllRules, patchEscalationRule } from '../../actions/escalations';

class AlertEscalation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    const { fetchAllRules } = this.props;
    fetchAllRules();
    cvoFetch('/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveRule = (rule) => {
    this.props.patchEscalationRule(rule.uid, omit(rule, ['uid']));
  }

  render() {
    const { newRule, inHandRule } = this.props;
    const { users } = this.state;
    return (
      <AlertEscalationContainer
        newRule={newRule}
        inHandRule={inHandRule}
        users={users}
        saveRule={this.saveRule}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  newRule: getRuleNew(state),
  inHandRule: getRuleInHand(state),
});


export default connect(mapStateToProps, {
  patchEscalationRule,
  fetchAllRules,
})(AlertEscalation);

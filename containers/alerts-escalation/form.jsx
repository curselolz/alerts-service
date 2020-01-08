import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from 'reactstrap';
import moment from 'moment';
import { PureComponent, PropTypes } from 'react';
import { omit } from 'lodash';

import '../../styles/alerts-escalation/alerts-escalation.scss';

class EscalationForm extends PureComponent {

  constructor(props) {
    super(props);

    let ruleFormValues = {
      ...omit(props.rule, ['contactManager', 'receivers']),
      contactManagerUid: props.rule.contactManager.uid,
      receivers: props.rule.receivers.join('; '),
    };

    this.state = {
      ruleFormValues
    };
  }

  handleFieldChange = (e) => {
    e.persist();
    if (typeof this.state.ruleFormValues[e.target.name] === 'undefined') {
      return;
    }

    this.setState(prevState => {
      let ruleFormValues = Object.assign({}, prevState.ruleFormValues);
      let { name, value } = e.target;
      if (name === 'enabled' || name === 'usePhone') {
        value = e.target.checked;
      }
      ruleFormValues[name] = value;
      return { ruleFormValues };
    });
  }

  render() {
    let { rule, users, saveRule } = this.props;
    let { ruleFormValues } = this.state;

    return (
      <Form className="mb-5 alert-escalation-form">
        <FormGroup check>
          <Label for={`enabled-${rule.uid}`} check>
            <Input
              defaultChecked={rule.enabled}
              type="checkbox"
              id={`enabled-${rule.uid}`}
              name="enabled"
              onChange={this.handleFieldChange}
            />
            Enable rule
          </Label>
        </FormGroup>
        <FormGroup row>
          <Label for={`alertStatus-${rule.uid}`} sm={2}>
            Current status
          </Label>
          <Col sm={10}>
            <Input
              disabled
              defaultValue={rule.alertStatus}
              type="text"
              id={`alertStatus-${rule.uid}`}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`newAlertStatus-${rule.uid}`} sm={2}>
            New status
          </Label>
          <Col sm={10}>
            <Input
              disabled
              defaultValue={rule.newAlertStatus}
              type="text"
              id={`newAlertStatus-${rule.uid}`}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for={`period-${rule.uid}`}>Set escalation term </Label>
          <Input
            type="select"
            name="period"
            id={`period-${rule.uid}`}
            defaultValue={rule.period}
            onChange={this.handleFieldChange}
          >
            <option value="60">1 minute</option>
            <option value="300">5 minutes</option>
            <option value="600">10 minutes</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for={`template-${rule.uid}`}>
            Mail template
          </Label>
          <Input
            defaultValue={rule.template}
            type="textarea"
            name="template"
            id={`template-${rule.uid}`}
            onChange={this.handleFieldChange}
          />
        </FormGroup>
        <FormGroup check>
          <Label for={`use-phone-${rule.uid}`} check>
            <Input
              defaultChecked={rule.usePhone}
              type="checkbox"
              id={`use-phone-${rule.uid}`}
              name="usePhone"
              onChange={this.handleFieldChange}
            />
            Phone
          </Label>
        </FormGroup>
        {
          ruleFormValues.usePhone ? (
            <div>
              <FormGroup>
                <Label for={`phone-number-${rule.uid}`}>
                  Phone number
                </Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  id={`phone-number-${rule.uid}`}
                  defaultValue={rule.phoneNumber}
                  placeholder="Enter phone number"
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`sms-template-${rule.uid}`}>
                  SMS template
                </Label>
                <Input
                  defaultValue={rule.smsTemplate}
                  type="textarea"
                  name="smsTemplate"
                  id={`sms-template-${rule.uid}`}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            </div>
          ) : ''
        }
        <FormGroup>
          <Label for={`contactManagerUid-${rule.uid}`}>Choose next-step manager</Label>
          <Input
            type="select"
            name="contactManagerUid"
            id={`contactManagerUid-${rule.uid}`}
            defaultValue={rule.contactManager.uid}
            onChange={this.handleFieldChange}
          >
            {users.map(u => {
              return (<option key={u.uid} value={u.uid}>{u.firstName} {u.lastName}</option>)
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for={`receivers-${rule.uid}`}>
            Users to be notified
          </Label>
          <Input
            type="email"
            name="receivers"
            id={`receivers-${rule.uid}`}
            defaultValue={rule.receivers.join('; ')}
            placeholder="Enter email user"
            onChange={this.handleFieldChange}
          />
        </FormGroup>
        <Button className="mt-3" onClick={() => { saveRule(this.state.ruleFormValues) }}>Save changes</Button>
      </Form>
    );
  }
}


EscalationForm.propTypes = {
  saveRule: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  rule: PropTypes.object.isRequired,
}

export default EscalationForm;

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from 'reactstrap';
import moment from 'moment';
import React, { PropTypes } from 'react'

const EscalationForm = ({
  setForRule,
  sendData,
  users,
  values,
  fetchedRule,
  setUserNotify,
  selectedRule,
}) => {
  const time = [600000, 300000, 60000];
  let newReceivers = fetchedRule && fetchedRule.receivers.map(el => el.replace(/,/g, ';'));
  return (
    <Form className="mb-5">
      <FormGroup check>
        <Label className="d-block" check>
          <Input
            checked={values.selectedRule === '' ? fetchedRule.enabled : values.enabled}
            type="checkbox"
            onChange={(e) => setForRule('enabled', e.target.checked)}
          />
          Enable rule
        </Label>
      </FormGroup>
      <FormGroup row>
        <Label for="currentStatus" sm={2}>
          Current status
        </Label>
        <Col sm={10}>
          <Input
            disabled
            defaultValue={fetchedRule.alertStatus}
            type="text"
            id="currentStatus"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="newStatus" sm={2}>
          New status
        </Label>
        <Col sm={10}>
          <Input
            disabled
            defaultValue={fetchedRule.newAlertStatus}
            type="text"
            id="newStatus"
          />
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="escalation-form">Set escalation term </Label>
        <Input
          type="select"
          name="escalation-form"
          id="escalation-form"
          value={`${values.term}`}
          onChange={(e) => setForRule('term', e.target.value)}
            >
          {time.map(el => <option
            value={`${el / 1000}`}>
            {moment(el).format('m')} minutes
            </option>)
          }
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="mail-template">
          Mail template
        </Label>
        <Input
          defaultValue={fetchedRule.template}
          type="textarea"
          name="mail-template"
          id="mail-template"
          onChange={(e) => setForRule('template', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="next-step-manager">Choose next-step manager</Label>
        <Input
          type="select"
          name="next-step-manager"
          id="next-step-manager"
          onChange={(e) => setForRule('nextStepManager', e.target.value)}
          value={`${values.nextStepManager}`}
            >
          {users && users.map(el => <option
            value={`${el.uid}`}
            >
            {el.firstName + ' ' + el.lastName}
          </option>
          )}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="notify-user">
          Users to be notified
        </Label>
        <Input
          type="email"
          name="notify-user"
          id="notify-user"
          defaultValue={newReceivers}
          placeholder="Enter email user"
          onChange={(e) => setUserNotify(e.target.value)}
        />
        <Button className="mt-3" onClick={() => sendData(selectedRule)}>Save changes</Button>
      </FormGroup>
    </Form>
  )
}


EscalationForm.propTypes = {
  setForRule: PropTypes.func.isRequired,
  sendData: PropTypes.func.isRequired,
  users:PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  fetchedRule:PropTypes.object.isRequire,
}

export default EscalationForm;
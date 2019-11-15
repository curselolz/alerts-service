import { Layout } from 'cvo-ui/containers';
import {
  Container,
  Row,
  Col,
  Form
} from 'reactstrap';

import BreadCrumbs from '../breadCrumb';
import React, { PropTypes } from 'react'
import EscalationForm from './form';

const AlertEscalationContainer = ({
  setForInHandRule,
  setForNewRule,
  sendData,
  users,
  values,
  newRule,
  inHandRule,
  setUserNotify,
}) => {
  return (
    <Layout
      breadcrumbs={<BreadCrumbs text="Escalation settings" />}
    >
      <Container className="ml-0">
        <Row>
          <Col xs="12" sm="12">
            {
              newRule && inHandRule ? (
                <div>
                  <h4>Rule for new</h4>
                  <EscalationForm
                    sendData={sendData}
                    users={users}
                    values={values.newRule}
                    setUserNotify={setUserNotify}
                    fetchedRule={newRule}
                    selectedRule={'new'}
                    setForRule={setForNewRule}
                  />
                  <h4>Rule for in Hand</h4>
                  <EscalationForm
                    sendData={sendData}
                    users={users}
                    values={values.inHandRule}
                    setUserNotify={setUserNotify}
                    fetchedRule={inHandRule}
                    selectedRule={'inHand'}
                    setForRule={setForInHandRule}
                  />
                </div>
              ) : <Form><p>no available rule</p></Form>
            }
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

AlertEscalationContainer.propTypes = {
  sendData:PropTypes.func.isRequired,
  setForNewRule:PropTypes.func.isRequired,
}

export default AlertEscalationContainer;
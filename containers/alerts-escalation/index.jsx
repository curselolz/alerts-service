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
  newRule,
  inHandRule,
  users,
  saveRule,
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
                    rule={newRule}
                    users={users}
                    saveRule={saveRule}
                  />

                  <h4>Rule for in Hand</h4>
                  <EscalationForm
                    rule={inHandRule}
                    users={users}
                    saveRule={saveRule}
                  />
                </div>

              ) : <Form><p>no available rules</p></Form>
            }
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

AlertEscalationContainer.propTypes = {
  saveRule: PropTypes.func.isRequired,
}

export default AlertEscalationContainer;

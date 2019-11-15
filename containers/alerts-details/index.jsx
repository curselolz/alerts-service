import { Container, Row, Col } from 'reactstrap';
import AlertDetailImage from '../alert-details-image';
import BreadCrumbs from '../breadCrumb';
import AlertListDetails from '../alert-list-details';
import { Layout } from 'cvo-ui/containers';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/alert-details/alerts-details.scss';
import AlertsStatusButtons from '../../components/alerts-status-buttons';
import { Button } from 'components';
import { PropTypes } from 'react';

const SubHeader = ({ alert, redirectToDashboard}) => {
    return (
        <div className="d-flex justify-content-end">
            {alert && <AlertsStatusButtons fetchedAlert={alert}/>}
            <Button onClick={redirectToDashboard}>Show on map</Button>
        </div>
    )
}

const AlertDetailsContainer = ({ alert, redirectToDashboard}) => {
    return (
        <Layout
            breadcrumbs={<BreadCrumbs text="Alerts Details" />}
            subheaderControls={
                <SubHeader
                    alert={alert}
                    redirectToDashboard={redirectToDashboard}
                />}
        >
            <Container className="ml-0">
                <Row>
                    <Col xs="6">
                        {alert && <AlertListDetails alert={alert} />}
                    </Col>
                    <Col xs="6">
                        {alert && <AlertDetailImage alert={alert} />}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

AlertDetailsContainer.propTypes = {
    alert:PropTypes.object.isRequired,
    redirectToDashboard: PropTypes.func.isRequired,
    redirectToEscalation: PropTypes.func.isRequired,
};

export default AlertDetailsContainer;
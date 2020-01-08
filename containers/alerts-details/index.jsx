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
import AlertsOnMap from '../../components/alert-show-on-map/container';

const SubHeader = ({ alert, openModal}) => {
    return (
        <div className="d-flex justify-content-end">
            {alert && <AlertsStatusButtons fetchedAlert={alert} />}
            <Button onClick={openModal} className="show-on-map-btn">Show on map</Button>
        </div>
    )
}

const AlertDetailsContainer = ({ modalState, alert, openModal }) => {
    return (
        <Layout
            breadcrumbs={<BreadCrumbs text="Alerts Details" />}
            subheaderControls={
                <SubHeader
                    alert={alert}
                    openModal={openModal}
                />
            }
        >
            <AlertsOnMap
                modalState={modalState}
                deviceNumber={alert && alert.person}
            />
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
    openModal: PropTypes.func.isRequired,
};

export default AlertDetailsContainer;

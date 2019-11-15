import { PropTypes } from 'react';
import moment from 'moment';

const AlertListDetails = ({alert}) => {
    return (
        <ul className = "list">
            <li className="details-row">
                <p>
                    Id: {alert && alert.uid}
                </p>
            </li>
            <li className="details-row">
                <p>
                    Name: {`${alert && alert.person.name} ${alert && alert.person.lastName}`}
                </p>
            </li>
            <li className="details-row">
                <p>Trackable type: alert</p>
            </li>
            <li className="details-row">
                <p>
                    Date created: {
                        alert && moment.unix(alert.createdTime).format('MMMM Do YYYY h:mm:ss a')
                    }
                </p>
            </li>
            <li className="details-row">
                <p>
                    Status: {alert && alert.status}
                </p>
            </li>
            <li className="details-row">
                <p>
                    Contact name: {
                        alert && alert.manager.firstName !== undefined && alert.manager.firstName !== null ?
                            `${alert.manager.firstName} ${alert.manager.lastName}` : ''
                    }
                </p>
            </li>
            <li className="details-row">
                <p>
                    Contact manager email: {
                        alert && alert.manager.email ? alert.manager.email : 'no email added yet'
                    }
                </p>
            </li>
            <li className="details-row">
                <p>
                    Contact manager phone: {
                        alert && alert.manager.phone ? alert.manager.phone : 'no phone added yet'
                    }
                </p>
            </li>
            {
                alert && (alert.inHandTime !== null || alert.inHandComment !== null) ? (
                    <li className="details-row">
                        <p>
                            Time to transfer status to work: {
                                moment.unix(alert.inHandTime).format('MMMM Do YYYY h:mm:ss a')
                            }
                        </p>
                        <p>
                            Comment when transfer status to work: {
                                alert.inHandComment && alert.inHandComment !== ''
                                    ? alert.inHandComment : 'no comments'
                            }
                        </p>
                    </li>
                ) : ''
            }
            {
                alert && (alert.declinedTime !== null || alert.declinedComment !== null) ? (
                    <li className="details-row">
                        <p>
                            Time to transfer status to declined: {
                                moment.unix(alert.declinedTime).format('MMMM Do YYYY h:mm:ss a')
                            }
                        </p>
                        <p>
                            Comment when transfer status to declined: {
                                alert.declinedComment && alert.declinedComment !== ''
                                    ? alert.declinedComment : 'no comments'
                            }
                        </p>
                    </li>
                ) : ''
            }
            {
                alert && (alert.resolvedTime !== null || alert.resolvedComment !== null) ? (
                    <li className="details-row">
                        <p>
                            Time to transfer status to resolved: {
                                moment.unix(alert.resolvedTime).format('MMMM Do YYYY h:mm:ss a')
                            }
                        </p>
                        <p>
                            Comment when transfer status to resolved: {
                                alert.resolvedComment && alert.resolvedComment !== ''
                                    ? alert.resolvedComment : 'no comments'
                            }
                        </p>
                    </li>
                ) : ''
            }
        </ul>
    )
}

AlertListDetails.propTypes = {
    alert: PropTypes.object.isRequired
};

export default AlertListDetails;

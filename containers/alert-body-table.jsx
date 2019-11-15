import moment from 'moment';
import { Link } from 'react-router';
import AlertsStatusButtons from '../components/alerts-status-buttons';
import AlertsStatus from './alerts-status';
import React, { PropTypes } from 'react';


class AlertBodyTable extends React.PureComponent {
    render () {
        const { element } = this.props;
        return (
            <tr key={element.uid}>
                <td>{element.person.name} {element.person.lastName}</td>
                <td>
                    <span>{moment.unix(element.createdTime).format('MMMM Do YYYY')}</span><br />
                    <span>{moment.unix(element.createdTime).format('h:mm:ss a')}</span>
                </td>
                <td>{<AlertsStatus status={element.status} />}</td>
                <td>
                    <span>Phone: {element.manager.phone}</span><br />
                    <span>Email: {element.manager.email}</span>
                </td>
                <td><AlertsStatusButtons fetchedAlert={element} uid={element.uid} /></td>
                <td className="text-right">
                    <Link className="ui button details-btn" to={{
                        pathname: `/alerts/${element.uid}`, state: element
                    }}>
                        View details
                    </Link>
                </td>
            </tr>
        )
    }
}

AlertBodyTable.propTypes = {
    element: PropTypes.object.isRequired
};

export default AlertBodyTable;

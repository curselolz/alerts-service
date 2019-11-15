import React, { PropTypes } from 'react';

const AlertsStatus = ({ status}) => {
    let data = <div></div>;
    switch (status) {
        case 'new':
            data = <div className="wrapper-status"><div className="dot new" /><span>New</span></div>;
            break;
        case 'inHand':
            data = <div className="wrapper-status"><div className="dot in-hand" /> In hand</div>;
            break;
        case 'declined':
            data = <div className="wrapper-status"><div className="dot declined" />Declined</div>;
            break;
        case 'resolved':
            data = <div className="wrapper-status"><div className="dot resolved" />Resolved</div>;
            break;
        default:
            <div className="wrapper-status"></div>;
            break;
    }
    return (
        <div>
            {data}
        </div>
    )
}

AlertsStatus.propTypes = {
    status: PropTypes.string.isRequired
};

export default AlertsStatus;

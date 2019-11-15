import { Button } from 'components';
import React, {PropTypes} from 'react';

const AlertStatusButtonContainer = ({fetchedAlert, handleSetStatusButton}) => {
    let allowedButtons = [];
    if (fetchedAlert && fetchedAlert.status === 'new') {
        allowedButtons.push(
            <Button
                key="inhand"
                className="in-hand-btn"
                data-status="inHand"
                onClick={(e) => handleSetStatusButton(e)}>
                    Take In Hand
                </Button>);
        allowedButtons.push(
            <Button
                key="declined"
                className="declined-btn"
                data-status="declined"
                onClick={(e) => handleSetStatusButton(e)}>
                    Decline
                </Button>);
    } else if (fetchedAlert && fetchedAlert.status === 'inHand') {
        allowedButtons.push(
            <Button
                key="resolved"
                className="resolved-btn"
                data-status="resolved"
                onClick={(e) => handleSetStatusButton(e)}>
                    Set Resolved
                </Button>);
        allowedButtons.push(
            <Button key="declined"
            className="declined-btn"
            data-status="declined"
                onClick={(e) => handleSetStatusButton(e)}>
                Decline
            </Button>);
    }

    return (
    <div className="d-flex justify-content-center">
        {allowedButtons[0]}
        {allowedButtons[1]}
    </div>
    )

}

AlertStatusButtonContainer.propTypes = {
    fetchedAlert: PropTypes.object.isRequired,
    handleSetStatusButton: PropTypes.func.isRequired,
};
export default AlertStatusButtonContainer;
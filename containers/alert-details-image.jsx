import { PropTypes } from 'react';

const AlertDetailImage = ({alert}) => {
    return (
        alert && alert.person.picture ? (
            <img className="card-img-top" src={alert.person.picture} />
        ) : (
                <div className="cvo-no-img">
                    <svg className="cvo-no-img-block">
                        <line className="cvo-no-img-line" x1="0" y1="100%" x2="100%" y2="0" />
                        <line className="cvo-no-img-line" x1="100%" y1="100%" x2="0" y2="0" />
                    </svg>
                </div>
            )
    )
}

AlertDetailImage.propTypes = {
    alert: PropTypes.object.isRequired
};


export default AlertDetailImage;
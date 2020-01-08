import { Component } from 'react';
import { MapPopup, ScalableBGImage } from 'components';
import { TrackableImage } from './trackable-list-image';
import { Link } from 'react-router';
import { utc } from 'moment';
import { TRACKABLE_STATUSES } from '../../constants';
const { ACTIVE } = TRACKABLE_STATUSES;

export class TrackableInfoPopup extends Component {
    render() {
        let { trackable, utcOffset } = this.props;
        let { uid, name, lastName, picture, assignedTag, lastSeen, status } = trackable;
        let isInactive = status !== ACTIVE;
        if (isInactive) {
            lastSeen = utc(lastSeen).utcOffset(utcOffset).fromNow();
        }

        return <MapPopup wide className='trackable-info-popup'>
            <div className="trackable-info-popup_float-wraper">
                {picture && <div className='trackable-info-popup__picture'>
                    <TrackableImage width={50} height={50} src={picture} className="image-preview">
                        <ScalableBGImage src={picture} resolution="small" />
                    </TrackableImage>
                </div>}
                <div className='trackable-info-popup__client'>
                    <div className="trackable-info-popup__header">
                        <Link className="trackable-info-popup__link" to={`trackables/${uid}`}>{name} {lastName}</Link>
                    </div>
                    <div className="trackable-info-popup__content">
                        {isInactive && <div className="trackable-info-popup__last-seen">
                            <span className="text-quite">Last seen: {lastSeen}</span>
                        </div>}
                    </div>
                </div>
            </div>
        </MapPopup>;
    }
}

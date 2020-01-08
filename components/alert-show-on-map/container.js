import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as trackablesActions from '../../actions/trackables';
import { getFloorInfoIndex } from '../../selectors/floor';
import AlertsOnMap from './index.jsx';
import { cvoStorage } from 'cvo-tools';
import { initTrackables } from '../../actions/init-application';
import { changeModalState } from '../../actions/alerts';

function mapStateToProps(state, props) {
    const { deviceNumber, modalState } = props;
    const { trackables } = state;
    const { persons } = trackables;
    const { data } = persons;
    let trackable = deviceNumber && deviceNumber !== null ?  data[deviceNumber.uid] : '';
    let floors = getFloorInfoIndex(state);
    let rotations = cvoStorage.userGet('rotationsMapViewState');
    let rotation;
    if (trackable && trackable !== '') {
        trackable = trackable && Object.assign(trackable, trackable.location);
        if (rotations) {
            if (rotations[trackable.floor] !== undefined) {
                rotation = rotations[trackable.floor];
            } else {
                rotation = state.venue.venue.rotation || 0;
            }
        }
        let { floor: floorUid } = trackable;
        let { [floorUid]: floor } = floors;
        return {
            trackable,
            modalState,
            floor,
            rotation,
        };
    }
    return { modalState};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...trackablesActions,
        initTrackables,
        changeModalState
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsOnMap);

import { Component, PropTypes } from 'react';
import GeojsonProjector from 'geojson-projector';
const project = GeojsonProjector('EPSG:4326', 'EPSG:3857');
import AlertTrackablePosition from '../../containers/alerts-show-on-map/alert-trackable-pos';
import {
    Modal,
    Map,
    Button,
} from 'components';
import { changeModalState } from '../../actions/alerts';
import { connect } from 'react-redux';

let fitsCache = new WeakMap();

class AlertsOnMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.statusModal,
        };
    }

    componentDidMount() {
        this.props.initTrackables();
    }

    setShowInfo = showInfo => this.setState({ showInfo });

    onZoom = () => {
        this.setState({});
    };

    TrackablePosition = () => {
        let {
            floor,
            trackable,
            rotation
        } = this.props;
        let { showInfo } = this.state;

        let { setShowInfo, onZoom } = this;
        let viewportProps = {};
        let imageProps = {};
        let trackableProps = {};
        if (trackable && floor) {
            let { coordinates, status } = trackable;
            let { center, image: source, coefficient } = floor;
            center = project(center.geometry.coordinates, 'EPSG:4326', 'EPSG:3857');
            let fitGeometry = floor.geojson.geometry;
            let fit = fitsCache.get(fitGeometry);
            if (!fit) {
                fit = { to: fitGeometry, padding: [150, 50, 150, 50] };
                fitsCache.set(fitGeometry, fit);
            }
            viewportProps = { fit, rotation };
            imageProps = { coefficient, source, center };
            status = status.toLowerCase();
            trackableProps = {
                status,
                geojson: coordinates
            };
        } else {
            console.log('no trackable')
        }
        const utcOffset = 120;

        return (
            <AlertTrackablePosition
                setShowInfo={this.setShowInfo}
                onZoom={this.onZoom}
                mapRef={this.refs.map}
                showInfo={showInfo}
                utcOffset={utcOffset}
                floor={floor}
                onZoom={onZoom}
                viewportProps={viewportProps}
                imageProps={imageProps}
                trackableProps={trackableProps}
                trackable={trackable}
            />
        );
    };


    render() {
        let { TrackablePosition, setShowInfo } = this;
        const { statusModal, changeModalState } = this.props;

        let content;
        content = (
            <Map
                ref="map" mapMousedown={coordinates => { this._mouseDownCoords = coordinates; }}
                mapMouseup={coordinates => { _.isEqual(this._mouseDownCoords, coordinates)
                    && setShowInfo(false); }}
                className='trackable-on-map_content'>
                <TrackablePosition />
            </Map>
        );
        return (
            <div>
                <Modal
                    size="small"
                    open={statusModal}
                    onOpen={() => changeModalState(!open)}
                    onClose={() => changeModalState(!open)}
                    closeOnDimmerClick={false}
                >
                    <Modal.Content>
                        {content}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => changeModalState(!open)} primary>Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}


AlertsOnMap.propTypes = {
    statusModal: PropTypes.bool.isRequired,
    changeModalState: PropTypes.func.isRequired,
};

const mapStateToProps = ({ alerts }) => ({
    statusModal: alerts.statusModal,
});

export default connect(mapStateToProps,
    { changeModalState })(AlertsOnMap);

import {
  MapViewport,
  MapButton,
  MapImage,
  MapFloor,
  MapZone,
  MapPassage,
  MapTrackable,
  controls,
  interactions,
  Button,
  Dropdown
} from 'components';
import { PropTypes } from 'react';
import {TrackableInfoPopup} from './trackable-info-popup';
import '../../styles/alert-show-on-map/trackable.scss';

function renderCollection(collection, Component) {
  return collection.map((model, key) => <Component key={key} model={model} />);
}

function Floor({ floor = {} }) {
  let {
    zones,
    passages
  } = floor;
  return <div>
    {renderCollection([floor], MapFloor)}
    {renderCollection(zones, MapZone)}
    {renderCollection(passages, MapPassage)}
  </div>;
}

const Controls = ({ mapRef }) => {
  let canZoomIn, canZoomOut;
  if (mapRef) {
    ({ canZoomIn, canZoomOut } = mapRef);
  }
  return <controls.Control bottom left>
    <Button.Group vertical>
      <MapButton icon="plus" disabled={!canZoomIn} onClick={() => mapRef.zoomIn()} />
      <MapButton icon="minus" disabled={!canZoomOut} onClick={() => mapRef.zoomOut()} />
    </Button.Group>
  </controls.Control>;
};

const AlertTrackablePosition = ({
  setShowInfo,
  onZoom,
  viewportProps,
  imageProps,
  floor,
  trackableProps,
  showInfo,
  utcOffset,
  trackable,
  mapRef,
}) => {
  return (
    <div>
      {viewportProps && <MapViewport minZoom="fit" onZoom={onZoom} {...viewportProps} />}
      {imageProps && <MapImage {...imageProps} />}
      {floor && <Floor floor={floor} />}
      {trackable && (
        <MapTrackable {...trackableProps} overlay={showInfo} transition click={(event) => {
          setShowInfo(true);
        }}>
          <TrackableInfoPopup utcOffset={utcOffset} trackable={trackable} />
        </MapTrackable>
      )}
      <Controls mapRef={mapRef} />
      <interactions.Default />
      {floor && <controls.Control top right>
        <Dropdown
          disabled
          value={floor.uid}
          selection options={[{ text: floor.name, value: floor.uid }]} />
      </controls.Control>}
    </div>
  )
}

AlertTrackablePosition.propTypes = {
  setShowInfo: PropTypes.func.isRequired,
  onZoom:PropTypes.func.isRequired,
  viewportProps:PropTypes.object.isRequired,
  imageProps:PropTypes.object.isRequired,
  floor: PropTypes.object.isRequired,
  trackableProps: PropTypes.object.isRequired,
  showInfo:PropTypes.object.isRequired,
  utcOffset:PropTypes.number.isRequired,
  trackable: PropTypes.object.isRequired,
};

export default AlertTrackablePosition;
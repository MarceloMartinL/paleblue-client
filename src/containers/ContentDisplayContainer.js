import { connect } from 'react-redux';
import ContentDisplay from '../components/ContentDisplay';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';

function distanceBetween(location1, location2) {
  return Cartesian3.distance(location1, location2);
}

function nearbyContent(cameraLocation, dotsList, radius) {
  if (!cameraLocation || !dotsList) {
    return [];
  }
  return dotsList.filter(dot => {
    const dotLocation = Cartesian3.fromDegrees(dot.lng, dot.lat);
    return distanceBetween(cameraLocation, dotLocation) < radius;
  });
}

const mapStateToProps = (state, ownProps) => {
  const cameraLocation = state.camera.location;
  const dotsList = state.dotsList.data;
  const { scene } = ownProps;

  const height = scene.camera.positionCartographic.height;
  const radius = height / 10;

  return {
    nearbyContent: nearbyContent(cameraLocation, dotsList, radius)
  };
}

export default connect(
  mapStateToProps
)(ContentDisplay);

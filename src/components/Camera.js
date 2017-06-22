import React from 'react';
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler';
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType';
import Cartesian2 from 'cesium/Source/Core/Cartesian2';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';
import CesiumMath from 'cesium/Source/Core/Math';

const altitude = 20000000;
const maximumZoomDistance = 25000000;

let interval;

export default class Camera extends React.Component {
  componentDidMount() {
    const { userLocation } = this.props;
    const { scene } = this.props.viewer;

    scene.screenSpaceCameraController.maximumZoomDistance = maximumZoomDistance;

    scene.camera.setView({
      destination : Cartesian3.fromDegrees(userLocation.lng, userLocation.lat, altitude),
      orientation: {
        heading: 0.0,
        pitch: -CesiumMath.PI_OVER_TWO,
        roll: 0.0
      }
    });

    const doubleClickHandler = new ScreenSpaceEventHandler(scene.canvas);
    doubleClickHandler.setInputAction(movement => {
      this.props.viewer.trackedEntity = undefined;
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    scene.camera.moveEnd.addEventListener(this.clearMapCenterInterval);
    scene.camera.moveStart.addEventListener(this.getMapCenterOnInterval);
  }

  componentWillUnmount() {
    const { scene } = this.props.viewer;

    scene.camera.moveEnd.removeEventListener(this.clearMapCenterInterval);
    scene.camera.moveStart.removeEventListener(this.getMapCenterOnInterval);
  }

  getMapCenterOnInterval = () => {
    interval = setInterval(this.getMapCenter, 250);
  }

  clearMapCenterInterval = () => {
    clearInterval(interval);
  }

  getMapCenter = () => {
    const { viewer, setCameraLocation } = this.props;
    const { scene } = this.props.viewer;

    const windowPosition = new Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
    const pickRay = scene.camera.getPickRay(windowPosition);
    const location = {};
    const pickPosition = scene.globe.pick(pickRay, scene, location);
    if (pickPosition === undefined) {
      return null;
    }
    setCameraLocation(location);
  };

  render() {
    return null;
  }
}

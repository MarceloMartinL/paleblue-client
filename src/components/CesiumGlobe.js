import React from "react";

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import BingMapsImageryProvider from "cesium/Source/Scene/BingMapsImageryProvider";
import CesiumTerrainProvider from "cesium/Source/Core/CesiumTerrainProvider";

const BING_MAPS_URL = "//dev.virtualearth.net";
const BING_MAPS_KEY =
  "Ao8A_lsleN-M7elUZmPiMO0B0XkPBctzSPF7MCvoOTW7HmXLFR8KhqOsZymj_q7-";
const STK_TERRAIN_URL = "//assets.agi.com/stk-terrain/world";

import CameraContainer from "../containers/CameraContainer";
import ContentDisplayContainer from "../containers/ContentDisplayContainer";
import DotCollectionContainer from "../containers/DotCollectionContainer";
import NewContentAnimationContainer from "../containers/NewContentAnimationContainer";
import LikeAnimationContainer from "../containers/LikeAnimationContainer";
const containerStyle = {
  width: "100%",
  height: "100%"
};

const widgetStyle = {
  width: "100%",
  height: "100%"
};

export default class CesiumGlobe extends React.Component {
  state = { viewerLoaded: false };

  componentDidMount() {
    const imageryProvider = new BingMapsImageryProvider({
      url: BING_MAPS_URL,
      key: BING_MAPS_KEY
    });

    const terrainProvider = new CesiumTerrainProvider({
      url: STK_TERRAIN_URL
    });

    this.viewer = new Viewer(this.cesiumContainer, {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      scene3DOnly: true,
      navigationInstructionsInitiallyVisible: false,
      skyAtmosphere: false,
      creditContainer: "credits",
      imageryProvider,
      terrainProvider
    });

    // Force immediate re-render now that the Cesium viewer is created
    this.setState({ viewerLoaded: true });
  }

  componentWillUnmount() {
    if (this.viewer.dataSources) {
      this.viewer.dataSources.destroy();
    }
    if (this.viewer) {
      this.viewer.destroy();
    }
  }

  renderContents(userLocation) {
    const { viewerLoaded } = this.state;
    let contents = null;

    if (viewerLoaded) {
      const { dataSources, scene } = this.viewer;

      contents = (
        <span>
          <CameraContainer
            viewer={this.viewer}
            userLocation={userLocation}
            scene={scene}
          />
          <ContentDisplayContainer scene={scene} viewer={this.viewer} />
          <DotCollectionContainer
            dataSources={dataSources}
            userLocation={userLocation}
          />
          <NewContentAnimationContainer viewer={this.viewer} />
          <LikeAnimationContainer viewer={this.viewer} />
        </span>
      );
    }

    return contents;
  }

  render() {
    const { userLocation } = this.props;

    const contents = this.renderContents(userLocation);

    return (
      <div className="cesiumGlobeWrapper" style={containerStyle}>
        <div
          className="cesiumWidget"
          ref={element => (this.cesiumContainer = element)}
          style={widgetStyle}>
          {contents}
        </div>
      </div>
    );
  }
}

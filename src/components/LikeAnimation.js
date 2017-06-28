import React from "react";
import socket from "../websockets";
import Color from "cesium/Source/Core/Color";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import CallbackProperty from "cesium/Source/DataSources/CallbackProperty";
import defined from "cesium/Source/Core/defined";
import { pulse, drawLine, distanceBetween, fadedLine } from '../helpers/animation';

const velocity = 500;
const pulseTimes = 2;
const likeDuration = 1000 * 60;
const contentColor = Color.GOLD;
const userStartColor = Color.PALETURQUOISE;
const userEndColor = Color.DEEPSKYBLUE;
const likedStartColor = Color.RED;
const likedEndColor = Color.CRIMSON;
const strangerStartColor = Color.PINK;
const strangerEndColor = Color.SALMON;

class LikeAnimation extends React.Component {
  constructor(props) {
  	super();
    socket.on("new like", this.renderLike);

    this.state = {
      demoLines: []
    };

    socket.on("finish demo", () => {
      this.removeDemoLines();
    })
  }

  componentWillReceiveProps(newProps) {
  	if (newProps.likesList.length !== this.props.likesList.length) {
	  	newProps.likesList.forEach(this.renderLike);
  	}
  }

  componentWillUnmount() {
    socket.removeListener("new like", this.handleNewLike);
  }

  addDemoLine = line => {
    this.setState({
      demoLines: [...this.state.demoLines, line]
    });
  }

  removeDemoLines = () => {
    this.state.demoLines.forEach((line) => {
      this.props.viewer.entities.remove(line);
    });
  }

  renderLike = like => {
    const { viewer, userId } = this.props;

		const startPos = Cartesian3.fromDegrees(like.fromLng, like.fromLat);
		const endPos = Cartesian3.fromDegrees(like.toLng, like.toLat);

    let startColor, endColor, width;
    if (like.fromUserId === userId) {
      startColor = userStartColor;
      endColor = userEndColor;
      width = 2;
    } else if (like.toUserId === userId) {
      startColor = likedStartColor;
      endColor = likedEndColor;
      width = 2;
    } else {
      startColor = strangerStartColor;
      endColor = strangerEndColor;
      width = 1;
    }

    pulse(viewer, like.fromLng, like.fromLat, endColor, pulseTimes);

    const lineDuration = distanceBetween(startPos, endPos) / velocity;
    if (lineDuration === 0) return;

    const startEntity = viewer.entities.add({
	    position: startPos,
	    point: {
        pixelSize: 4,
	      color: startColor
	    }
	  });

	  const endEntity = viewer.entities.add({
	    position: endPos,
	    point: {
        pixelSize: 4,
	      color: contentColor
	    }
	  });

    if (like.demoId) {
	  	this.addDemoLine(startEntity);
	  	this.addDemoLine(endEntity);
	  }

	  const line = viewer.entities.add({
	    polyline: {
	      positions: drawLine(startEntity, endEntity, like, lineDuration),
	      material: fadedLine(startColor, endColor),
        width
	    }
	  });

	  if (like.demoId) {
	  	this.addDemoLine(line);
	  }


	  if (like.demoId) {
	  	this.addDemoLine(line);
	  }

    setTimeout(() => {
      viewer.entities.remove(line);
      viewer.entities.remove(startEntity);
      viewer.entities.remove(endEntity);
    }, likeDuration);
  }

  ////
  render() {
    return null;
  }
}

export default LikeAnimation;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Dialog } from "material-ui";

import RaisedButton from "material-ui/RaisedButton";
import DemoForm from "./DemoForm";

import { submitDot } from "../actions/submitDot";
import { cleanDemoDots } from "../actions/getDots";
import { regUser, logout } from "../actions/sessionActions";

import socket from "../websockets";

const inputStyle = {
  textAlign: "left",
  display: "block",
  margin: "0.5rem 0",
  width: "100%"
};

const buttonStyle = {
  margin: "1rem 0",
  textTransform: "uppercase"
};

const pStyle = {
  lineHeight: 1.25,
  textAlign: "left"
};


class DemoDialog extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      demoRunning: false,
    };

    socket.on("finish demo", () => {
      this.setState({ demoRunning: false });
      this.props.cleanDemoDots();
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      this.props.logout();
    })
  }

  startDemo = () => {
    this.setState({ demoRunning: true });
  }

  endDemo = () => {
    socket.emit("end demo");
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = (content) => {
    this.props.submitDot(content, true);
    this.handleClose();
  }


  render() {
    return (
      <div>
        <RaisedButton
		      label={this.state.demoRunning ? "Stop" : "Demo"}
		      primary={true}
		      onTouchTap={this.state.demoRunning ? this.endDemo : this.handleClick}
          style={{minWidth: 0}}
          labelStyle={{
            fontSize: 14,
            padding: "0 8px"
          }}
		    />
        <Dialog
          title="Welcome to Pale Blue!"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}
        >
          <p style={pStyle}>
            {"This demo will log you in as a guest and create content and likes around the globe. You can interact with the things you see and the app will continue to function normally."}
          </p>
          <p style={pStyle}>
            {"The simulation will end after 2 minutes and you will be logged out, but you can also stop anytime by using the stop button."}
          </p>
          <p>
            {"Type a message to begin."}
          </p>
          <DemoForm
            regUser={this.props.regUser}
            handleSubmit={this.handleSubmit}
            inputStyle={inputStyle}
            buttonStyle={buttonStyle}
            userLocation={this.props.userLocation}
            startDemo={this.startDemo}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.userLocation.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    regUser: () => {
      dispatch(regUser(`${Date.now()}@gmail.com`, "password"));
    },
    submitDot: (content, demo) => {
      dispatch(submitDot(content, demo));
    },
    cleanDemoDots: () => {
      dispatch(cleanDemoDots());
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoDialog);

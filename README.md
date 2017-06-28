# [paleblue](https://paleblue.surge.sh)

A browser-based web application for sharing and experiencing user-submitted content, visualizing user locations around the planet, and emphasizing ephemeral interactions.

This application was inspired by [Pale Blue Dot](https://en.wikipedia.org/wiki/Pale_Blue_Dot), a photograph of earth as a tiny speck in the vast expanse of space. This photograph was taken by the Voyager I space probe at the request of Carl Sagan, who shared his thoughts on the image:

> To my mind, there is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world. To me, it underscores our responsibility to deal more kindly and compassionately with one another and to preserve and cherish that pale blue dot, the only home we've ever known.

Although this application has features like those of a social network, it does not behave like a typical social network. It is not interested in collecting information or building lasting relationships. Instead, it attempts to cultivate a sense of scale between you, the planet, and the other human beings on it. Its goal is to provide an avenue for catching a momentary glimpse into people's lives from around the world.

## Technologies

- React
- Redux
- Cesium
- Node
- Express
- MongoDB / Mongoose
- Material-UI

## Features

- On startup, the app is centered over the user's current location to a high degree of accuracy.

![Startup](https://github.com/blackwright/paleblue-client/blob/master/screenshots/initial.jpg?raw=true)

- Cesium provides an interactive globe with zoom functionality.

![Zoom](https://github.com/blackwright/paleblue-client/blob/master/screenshots/zoom.jpg?raw=true)

### Authentication

- Users must sign up before they can submit or like content.
- Clicking the submit button while logged out will open the authentication dialog.

![Authentication](https://github.com/blackwright/paleblue-client/blob/master/screenshots/authentication.jpg?raw=true)

- Signup form fields use live validation for immediate feedback.
- Errors during login and signup are handled through Redux state.
- Newly registered users receive a confirmation email for account verification.

![Signup](https://github.com/blackwright/paleblue-client/blob/master/screenshots/signup.jpg?raw=true)

### Posting

- Users may post written text.
- Posts are created on the globe at the user's location.

![Text Post](https://github.com/blackwright/paleblue-client/blob/master/screenshots/textpost.jpg?raw=true)

- Whenever a new post is created, an animation is displayed for all users simultaneously.

![Text Submission](https://github.com/blackwright/paleblue-client/blob/master/screenshots/textsubmit.jpg?raw=true)

- Users may post images from their filesystem, and in the case of mobile devices, take a photo that is uploaded directly.

![Image Post](https://github.com/blackwright/paleblue-client/blob/master/screenshots/imagepost.jpg?raw=true)

- Like text posts, new images will appear in the carousel at the top.

![Image Submission](https://github.com/blackwright/paleblue-client/blob/master/screenshots/imagesubmit.jpg?raw=true)

- Any content within the reticle area is displayed in the carousel.

![Multiple dots](https://github.com/blackwright/paleblue-client/blob/master/screenshots/multipledots.jpg?raw=true)

- The reticle scales with zoom distance, allowing the user to select a relevant area.

![Multiple dots zoomed in](https://github.com/blackwright/paleblue-client/blob/master/screenshots/multipledots2.jpg?raw=true)

- Posts can be enlarged and liked by other users.

![Fullscreen](https://github.com/blackwright/paleblue-client/blob/master/screenshots/fullscreen.jpg?raw=true)

### Liking

- Registered users may like other users' posts.
- Animated lines connect users to liked content.
- Likes are seen by all users connected to the app.
- Lines are colored differently based on their relationship to the current user.
- Lines are temporary.

![Likes](https://github.com/blackwright/paleblue-client/blob/master/screenshots/likes.jpg?raw=true)

### Demo Mode

- Both registered and unregistered users can activate demo mode, which presents a sampling of the app's features.
- Simulated content is generated around the globe and can be liked by the user.
- Only the current user sees the content created by the demo.
- While the demo is running, the rest of the app functions as normal.

![Demo form](https://github.com/blackwright/paleblue-client/blob/master/screenshots/demoform.jpg?raw=true)

### Mobile

- The app responsively scales to screens of various sizes.

![Mobile](https://github.com/blackwright/paleblue-client/blob/master/screenshots/mobile1.jpg?raw=true)

![Mobile](https://github.com/blackwright/paleblue-client/blob/master/screenshots/mobile2.jpg?raw=true)

### Technical Notes

- On startup, a Mongoose query displays only content submitted within 12 hours.
- A websockets event is triggered when a user closes or leaves the page, setting a "last active" time on their account. If the user receives any likes while away from the app, those likes are rendered when the user returns.
- Time and location data is fetched on hover via the Google Maps API.
- Images are sent to AWS S3 directly from the browser, securely uploaded using a presigned URL from the server.

### Developers

[Jerry Gao](https://github.com/blackwright)
[Nicolas Amaya](https://github.com/nicoasp)
[Mark Hahn](https://github.com/markmarkyesyes)

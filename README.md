# live-locate

A small practice Node.js app that demonstrates real-time location sharing using Express, EJS and Socket.io. The server listens for "send-location" socket events from clients and broadcasts them as "receive-location" events to all connected clients.

## Features

- Simple Express server with EJS templating
- Socket.io integration for real-time location updates
- Emits `receive-location` when a client sends location data
- Emits `user-disconnected` when a client disconnects

## Requirements

- Node.js 16+ (or a compatible LTS)
- npm

## Installation

1. Clone the repository:
```
   git clone https://github.com/m-taqii/live-locate.git
   cd live-locate
```
2. Install dependencies:
```
   npm install
```
## Usage

Start the server:
```
   node app.js
```
By default the app runs on port 3000. Open http://localhost:3000 in multiple browser windows to test real-time location sharing.

## How it works

- The server (app.js) sets up an Express app with EJS as the view engine and serves static files from the `public` directory.
- Socket.io listens for a `connection` event. When a socket emits `send-location` with location data (for example: { lat, lng }), the server broadcasts the payload to all clients as `receive-location` along with the sender's socket id.
- When a client disconnects the server broadcasts `user-disconnected` with the socket id.

Example server behavior (from app.js):

```js
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });

  console.log("Connected");
});
```

## Socket Events

- send-location: client -> server
  - payload: any object containing location info (e.g., { lat, lng })
- receive-location: server -> clients
  - payload: { id, ...location }
- user-disconnected: server -> clients
  - payload: socket id of the disconnected client

## Development

You can extend this project to include:

- Client-side code to capture geolocation and emit `send-location`
- Display markers on a map (Leaflet, Google Maps, Mapbox)
- Authentication and private rooms

## License

This repository was created as a practice project. No license specified.

## Acknowledgements

Built as a small demo using Express and Socket.io for learning purposes.

//import Toastinette from "./toastinette";

const socket = io('/feed');

function send(userCredentials) {
  let message = `Update feed to see new post from ${userCredentials.name}.`;
  socket.emit('publication', message);
}
socket.on('connect', () => {
  console.log('socket connected');
});
socket.on('publication', (message) => {
  console.log('received:', message);
  receivedMessage(message);
});
function receivedMessage(message) {
  let toast = new Toastinette({
    message: message,
    title: 'New post!',
    position: 'top-right',
    type: 'info',
    autoClose: 60000,
    progress: true
  });
}


const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// emit => emitir alguma informação
// on => escutando alguma informação
// Tanto do lado do servidor quanto do cliente

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`;

socket.emit("select_room", {
  username,
  room,
}, messages => {
  messages.forEach(message => createMessage(message))
});

document.getElementById("message_input").addEventListener(
  "keypress", (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value
      const data = {
        room,
        message,
        username,
      }

      socket.emit("message", data);

      event.target.value = "";
    }
  }
);

socket.on("message", data => {
  createMessage(data);
});

function createMessage(data) {
  const messagesDiv = document.getElementById("messages");

  messagesDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong> ${data.username} </strong> <span> ${data.text} - ${data.createdAt}</span>
      </label>
    </div>
  `;
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html"
})
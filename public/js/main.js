const socket = io();

const enterForm = document.getElementById('enterForm');
const enterButton = document.getElementById('enterButton');
const enterPopup = document.getElementById('enterPopup');
const mainTag = document.getElementsByTagName('main')[0];

let messagesDiv, currentUser, messageInput;

const onSubmitEnterForm = ev => {
  ev.preventDefault();
  const data = getInputsDataFromForm(ev.target);
  socket.emit('enterRoom', data);
  enterButton.disabled = true;
};

const onSubmitMessageForm = ev => {
  ev.preventDefault();
  socket.emit('sendMessage', messageInput.value);
  messageInput.value = '';
};

const addMessage = message => messagesDiv.appendChild(genMessageDiv(message, currentUser));

const onConnectRoom = (messages, currentUsername) => {
  enterPopup.remove();
  currentUser = currentUsername;

  const roomDisplay = htmlToElement(`
    <div class="h-100 d-flex flex-column">
      <div class="flex-grow-1 bg-light" id="messagesDiv"></div>
      <form id="messageForm">
        <input type="text" autocomplete="off" class="form-control" placeholder="Message" id="messageInput">
      </form>
    </div>
  `);

  mainTag.appendChild(roomDisplay);

  messagesDiv = document.getElementById('messagesDiv');
  messages.forEach(addMessage);

  messageInput = document.getElementById('messageInput');

  document.getElementById('messageForm')
    .addEventListener('submit', onSubmitMessageForm);

  scrollDown();
};

const onSameUsernameInRoom = () => {};

const handleNewMessage = message => {
  addMessage(message);
  window.scrollTo(0, document.body.scrollHeight);
};

enterForm.addEventListener('submit', onSubmitEnterForm);

socket.on('connectRoom', onConnectRoom);
socket.on('sameUsernameInRoom', onSameUsernameInRoom);
socket.on('newMessage', handleNewMessage);

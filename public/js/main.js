import { genMessageDiv, getInputsDataFromForm, scrollDown, htmlToElement, genConnectionNotificationDiv } from "./utils.js";

const socket = io();

const enterForm = document.getElementById('enterForm');
const enterButton = document.getElementById('enterButton');
const enterPopup = document.getElementById('enterPopup');
const mainTag = document.getElementsByTagName('main')[0];
const invalidUsernameFeedbackDiv = document.getElementById('invalidUsernameFeedbackDiv');
const usernameInput = document.getElementById('usernameInput');

let messagesDiv, currentUser, messageInput;

const onSubmitEnterForm = ev => {
  ev.preventDefault();
  const data = getInputsDataFromForm(ev.target);
  socket.emit('enterRoom', data);
  enterButton.disabled = true;
};

const onSubmitMessageForm = ev => {
  ev.preventDefault();
  if(!messageInput.value) return;
  socket.emit('sendMessage', messageInput.value.trim());
  messageInput.value = '';
};

const addMessageOrNotification = message => messagesDiv.appendChild(
    message.isConnectionMessage
      ? genConnectionNotificationDiv(message)
      : genMessageDiv(message, currentUser)
  );

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
  messages.forEach(addMessageOrNotification);

  messageInput = document.getElementById('messageInput');

  document.getElementById('messageForm')
    .addEventListener('submit', onSubmitMessageForm);

  scrollDown();
};

const handleMessageOrNotification = message => {
  if(!messagesDiv) return;
  addMessageOrNotification(message);
  scrollDown();
};

const showValidationFeedBackAndReactivateBtn = feedback => {
  invalidUsernameFeedbackDiv.textContent = feedback;
  usernameInput.classList.add('is-invalid');
  enterButton.disabled = false;
};

enterForm.addEventListener('submit', onSubmitEnterForm);

socket.on('connectRoom', onConnectRoom);
socket.on('newMessage', handleMessageOrNotification);
socket.on('connectionNotification', handleMessageOrNotification);
socket.on('invalidUsername', showValidationFeedBackAndReactivateBtn);

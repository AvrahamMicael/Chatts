const formatTime = time => moment(time).format('hh:mm a');

export const htmlToElement = html => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

export const genMessageDiv = ({ username, message, time }, currentUser) => htmlToElement(`
  <div class="m-2 text-${ username == currentUser ? 'end' : 'start' }">
    <span class="d-inline-block p-2 bg-light border rounded">
      <strong class="d-block small text-decoration-underline">${ username }</strong>
      <span>${ message }</span>
      <small class="d-block link-secondary small">${ formatTime(time) }</small>
    </span>
  </div>
`);

export const genConnectionNotificationDiv = ({ message, time, username }) => htmlToElement(`
  <div class="m-2 text-center">
    <span class="d-inline-block p-2 bg-light border rounded">
      <span><strong class="small text-decoration-underline">${ username }</strong> ${ message }</span>
      <small class="d-block link-secondary small">${ formatTime(time) }</small>
    </span>
  </div>
`);

export const getInputsDataFromForm = formElement => [ ...(new FormData(formElement)).entries() ].reduce((prev, [ key, value ]) => ({
  ...prev,
  [key]: value.trim(),
}), {});

export const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

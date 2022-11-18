const formatTime = time => moment(time).format('hh:mm a');

export const htmlToElement = html => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

export const genMessageDiv = ({ username, message, time }, currentUser) => {
  const isSameUsername = username == currentUser;
  return htmlToElement(`
    <div class="m-2 ${ isSameUsername ? 'ms-5' : 'me-5' } text-${ isSameUsername ? 'end' : 'start' }">
      <span class="d-inline-block p-2 bg-light border rounded">
        <strong class="d-block small text-decoration-underline text-start">${ username }</strong>
        <span class="d-block text-start">${ message }</span>
        <time class="d-block link-secondary small text-end">${ formatTime(time) }</time>
      </span>
    </div>
  `);
};

export const genConnectionNotificationDiv = ({ message, time, username }) => htmlToElement(`
  <div class="my-2 mx-5 text-center">
    <span class="d-inline-block p-2 bg-light border rounded">
      <span><strong class="small text-decoration-underline">${ username }</strong> ${ message }</span>
      <time class="d-block link-secondary small">${ formatTime(time) }</time>
    </span>
  </div>
`);

export const getInputsDataFromForm = formElement => [ ...(new FormData(formElement)).entries() ].reduce((prev, [ key, value ]) => ({
  ...prev,
  [key]: value.trim(),
}), {});

export const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

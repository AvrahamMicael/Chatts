export const htmlToElement = html => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

export const genMessageDiv = ({ username, message, time }, currentUser) => htmlToElement(`
  <div class="bg-light text-${ username == currentUser ? 'end' : 'start' }">
    <small>${ username }</small>
    <span>${ message }</span>
    <small>${ moment(time).format('hh:mm a') }</small>
  </div>
`);

export const getInputsDataFromForm = formElement => [ ...(new FormData(formElement)).entries() ].reduce((prev, [ key, value ]) => ({
  ...prev,
  [key]: value.trim(),
}), {});

export const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

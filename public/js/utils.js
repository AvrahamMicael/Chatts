const htmlToElement = html => {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};

const genMessageDiv = ({ username, message }, currentUser) => htmlToElement(`
  <div class="bg-light text-${ username == currentUser ? 'start' : 'end' }">
    <small>${ username }</small>
    <p>${ message }</p>
  </div>
`);

const getInputsDataFromForm = formElement => [ ...(new FormData(formElement)).entries() ].reduce((prev, [ key, value ]) => ({
  ...prev,
  [key]: value.trim(),
}), {});

const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

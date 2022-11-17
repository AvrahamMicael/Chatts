const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

module.exports = (string, ALLOWED_TAGS = []) => DOMPurify.sanitize(string, { ALLOWED_TAGS });

/**
 * Function that converts path template string to matching regular expression
 * @author Grace Whitney
 * @param {string} template - endpoint URL template where placeholders are
 *   surrounded by curly braces. Example: /users/{userId}/meetings
 * @returns {object} Regexp object of path template
 */
const templateToRegExp = (template) => {
  const placeholder = /\{\w*\}/g;
  const re = template.replace(placeholder, '\\w+');
  return new RegExp(re);
};

module.exports = templateToRegExp;

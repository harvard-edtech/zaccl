/**
 * Function that converts path template string to matching regular expression
 * @author Grace Whitney
 * @param {string} template - endpoint URL template where placeholders are
 *   surrounded by curly braces. Example: /users/{userId}/meetings
 * @returns {string} regex string of path template
 */
const templateToRegExp = (template) => {
  const placeholder = /\{\w*\}/g;
  return `^${template.replace(placeholder, '([^?/])+')}$`;
};

module.exports = templateToRegExp;

const path = require('path');
const fs = require('fs');

/**
 * Modify the contents of a file and save the changes
 * @param {string} path - the path of the file to modify
 * @param {string} modifier - the function that will modify the contents
 */
const modify = (path, modifier) => {
  const contents = fs.readFileSync(path, 'utf-8');
  fs.writeFileSync(path, modifier(contents), 'utf-8');
};

console.log('\n\n––––– Modding Templates –––––\n');

/*------------------------------------------------------------------------*/
/*                                Templates                               */
/*------------------------------------------------------------------------*/

/* --------------------------- Layout --------------------------- */
console.log('Layout Template');
modify(path.join(__dirname, 'template/tmpl/layout.tmpl'), (oldContents) => {
  let contents = oldContents;

  // Remove the page title
  contents = contents.replace(
    /\<\?js\ if \(title\ !=\ 'Home'.*\n.*\n.*js\ }\ \?\>\n/g,
    ''
  );

  // Add a border separating out the nav
  contents = contents.replace(
    /<nav <\?js if \(env\.conf\.docdash\.wrap\) { \?>class="wrap"<\?js } \?>>/g,
    '<nav style="border-right: 2px solid #ccc; padding-bottom: 25px;" <?js if (env.conf.docdash.wrap) { ?>class="wrap"<?js } ?>>'
  );

  // Create a more friendly footer
  contents = contents.replace(
    /\<footer\>\n.*\n\<\/footer\>/g,
    '<footer>\nWe use <a href="https://github.com/jsdoc3/jsdoc">JSDoc</a> and the <a href="https://github.com/clenemt/docdash">docdash</a> theme to generate our docs.\n</footer>'
  );

  return contents;
});

/*------------------------------------------------------------------------*/
/*                                  Code                                  */
/*------------------------------------------------------------------------*/

/* --------------------------- Publish -------------------------- */
console.log('Publisher Script');
modify(path.join(__dirname, 'template/publish.js'), (oldContents) => {
  let contents = oldContents;

  // Rename 'Namespaces' to 'Endpoint Functions'
  contents = contents.replace(
    /buildMemberNav\(members\.namespaces, 'Namespaces'/g,
    'buildMemberNav(members.namespaces, \'Endpoint Functions\''
  );

  // Change the link on the top left from 'Home' to 'CACCL API'
  contents = contents.replace(
    /var nav = \'<h2><a href="index\.html">Home<\/a><\/h2>';/g,
    'let nav = \'<h2><a style="font-size: 30px;" href="index.html">ZACCL API</a></h2>\';'
  );

  return contents;
});

/*------------------------------------------------------------------------*/
/*                              Print Closing                             */
/*------------------------------------------------------------------------*/

console.log('\n\n––––– Rebuilding Docs –––––\n');

console.log('Working...');
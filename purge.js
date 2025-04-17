const { PurgeCSS } = require('purgecss');
const fs = require('fs');

async function runPurgeCSS() {
  console.log('Running PurgeCSS...');

  const result = await new PurgeCSS().purge({
    content: ['index.html'],
    css: ['input.css'],
    output: 'output.css',

    // Needed to keep nested selectors from getting purged
		// https://github.com/FullHuman/purgecss/issues/1153#issuecomment-2626375284
    safelist: ['&'],

    variables: true,
  });

  fs.writeFileSync('output.css', result[0].css);
  console.log('Purged CSS written to output.css');
}

runPurgeCSS().catch(err => console.error('Error:', err));
const sortCSSmq = require('sort-css-media-queries');

const config = {
  plugins: {
    'autoprefixer': {},
    'css-mqpacker': {sort: sortCSSmq},
  }
};

module.exports = ({ file, options, env }) => {
  const development = options.mode === 'development';

  development ? config.plugins.autoprefixer.add = false 
              : config.plugins.autoprefixer.add = true;
  
  return config;
};
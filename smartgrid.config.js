/*
For creating grid run 
'node smartgrid.config.js'
in terminal
*/

const smartgrid = require('smart-grid');

const settings = {
  filename: 'smartgrid',
  outputStyle: 'scss',
  columns: 12, 
  offset: '30px', 
  mobileFirst: false, 
  container: {
    maxWidth: '1280px',
    fields: '30px'
  },
  breakPoints: {
    lg: {
      width: '1200px'
    },
    md: {
      width: '992px',
      fields: '15px'
    },
    sm: {
      width: '720px'
    },
    xs: {
      width: '576px'
    }
  },
  mixinNames: {
    container: 'wrap',
    row: 'row'
  },
  tab: '  ',
};

smartgrid('./src/scss/general', settings);
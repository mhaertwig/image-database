let baseUrl = 'http://localhost:8000';

switch (process.env.REACT_APP_ENV) {
  case 'local': {
    baseUrl = 'http://localhost:8000';
    break;
  }
  case 'prod': {
    baseUrl = '//tiles.trafimage.ch';
    break;
  }
  case 'stag': {
    break;
  }
  case 'dev':
  default: {
    break;
  }
}

export default {
  baseUrl,
};

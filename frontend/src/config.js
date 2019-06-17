let backendUrl = 'http://localhost:8000';

switch (process.env.REACT_APP_ENV) {
  case 'local': {
    backendUrl = 'http://localhost:8000';
    break;
  }
  case 'prod': {
    backendUrl = '//backend.climage.mariohaertwig.de';
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
  backendUrl,
};

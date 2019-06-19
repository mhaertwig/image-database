import objectToFormData from 'object-to-formdata';
import CONF from '../config';

export const SET_IMAGES = 'SET_IMAGES';
export const SET_PAGES = 'SET_PAGES';
export const SET_TAG_SUGGESTIONS = 'SET_TAG_SUGGESTIONS';
export const ADD_IMAGE = 'ADD_IMAGE';
export const IMAGE_UPLOADING = 'IMAGE_UPLOADING';

export const fetchImages = search => dispatch => {
  let url = `${CONF.backendUrl}/core/image/`;
  url += search ? `?search=${search}` : '';

  fetch(url)
    .then(data => data.json())
    .then(data => {
      dispatch({ type: SET_IMAGES, data });
    });
};

export const fetchPages = () => dispatch => {
  fetch(`${CONF.backendUrl}/core/page/`)
    .then(data => data.json())
    .then(data => {
      dispatch({ type: SET_PAGES, data });
    });
};

export const fetchTags = search => dispatch => {
  let url = `${CONF.backendUrl}/core/tag/`;
  url += search ? `?search=${search}` : '';

  fetch(url)
    .then(data => data.json())
    .then(data => {
      dispatch({ type: SET_TAG_SUGGESTIONS, data });
    });
};

export const addImage = body => dispatch => {
  const formData = objectToFormData(body);
  dispatch({ type: IMAGE_UPLOADING, data: true });
  fetch(`${CONF.backendUrl}/core/image/`, {
    method: 'POST',
    body: formData,
  })
    .then(data => data.json())
    .then(data => {
      dispatch({ type: ADD_IMAGE, data });
      dispatch({ type: IMAGE_UPLOADING, data: false });
    });
};

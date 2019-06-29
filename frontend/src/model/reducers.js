import {
  ADD_IMAGE,
  SET_IMAGES,
  SET_IMAGE,
  SET_PAGES,
  SET_TAG_SUGGESTIONS,
  IMAGE_UPLOADING,
} from './actions';

const initialState = {
  images: [],
  pages: [],
  tagSuggestions: [],
  isImageUploading: false,
};

export default function climageApp(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOADING:
      return {
        ...state,
        isImageUploading: action.data,
      };
    case SET_IMAGES:
      return {
        ...state,
        images: [...action.data],
      };
    case SET_IMAGE:
      return {
        ...state,
        image: { ...action.data },
      };
    case SET_PAGES:
      return {
        ...state,
        pages: [...action.data],
      };
    case SET_TAG_SUGGESTIONS:
      return {
        ...state,
        tagSuggestions: [...action.data],
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.data],
      };
    default:
      return {
        ...state,
      };
  }
}

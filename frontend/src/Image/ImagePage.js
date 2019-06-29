import React from 'react';
import PropTypes from 'prop-types';
import './ImagePage.scss';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  sidebar: PropTypes.element,
};

const defaultProps = {
  title: null,
  description: null,
  image: null,
  sidebar: null,
};

const ImagePage = ({ title, description, image, sidebar }) => (
  <div className="ImagePage">
    <div className="content">
      <div className="field title">{title}</div>
      <div className="image">{image}</div>
      <div className="field description">{description}</div>
    </div>
    <div className="sidebar">{sidebar}</div>
  </div>
);

ImagePage.propTypes = propTypes;
ImagePage.defaultProps = defaultProps;

export default ImagePage;

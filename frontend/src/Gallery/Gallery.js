import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridGallery from 'react-grid-gallery';
import PropTypes from 'prop-types';
import { fetchImages } from '../model/actions';

import './Gallery.scss';

const propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatchFetchImages: PropTypes.func.isRequired,
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    const { dispatchFetchImages } = this.props;
    dispatchFetchImages();
  }

  render() {
    const { images, dispatchFetchImages } = this.props;
    return (
      <div className="Gallery">
        <input
          className="image-search"
          type="text"
          placeholder="Search..."
          onChange={e => {
            if (!e.target.value || e.target.value.length > 2) {
              dispatchFetchImages(e.target.value);
            }
          }}
        />
        <GridGallery
          margin={5}
          images={images}
          enableImageSelection={false}
          showImageCount={false}
        />
      </div>
    );
  }
}

Gallery.propTypes = propTypes;

const mapStateToProps = state => ({
  images: state.images,
});

const mapDispatchToProps = {
  dispatchFetchImages: fetchImages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gallery);

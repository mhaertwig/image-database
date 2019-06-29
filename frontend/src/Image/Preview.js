import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ImagePage from './ImagePage';
import { setImage, fetchImage } from '../model/actions';

import './Preview.scss';

const propTypes = {
  history: PropTypes.shape().isRequired,
  image: PropTypes.shape(),
  images: PropTypes.arrayOf(PropTypes.shape()),
  slug: PropTypes.string.isRequired,
  dispatchFetchImage: PropTypes.func.isRequired,
  dispatchSetImage: PropTypes.func.isRequired,
};

const defaultProps = {
  image: null,
  images: [],
};

class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prev: null,
      next: null,
    };

    const { slug, dispatchFetchImage } = this.props;

    if (slug) {
      dispatchFetchImage(slug);
    }

    document.addEventListener('keydown', this.onDocumentKeyDown.bind(this));
  }

  componentDidUpdate(prevProps) {
    const { slug, dispatchFetchImage, image } = this.props;

    if (prevProps.slug !== slug) {
      dispatchFetchImage(slug);
    }

    if (prevProps.image !== image) {
      this.updateSiblingImages();
    }
  }

  componentWillUnmount() {
    const { dispatchSetImage } = this.props;
    dispatchSetImage(null);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  onDocumentKeyDown(e) { 
    const { prev, next } = this.state;
    if (e.which === 37 && prev) {
      this.loadImage(prev.slug);
    } else if (e.which === 39 && next) {
      this.loadImage(next.slug);
    }
  }

  updateSiblingImages() {
    const { image, images } = this.props;

    if (image && images.length) {
      const currentImage = images.find(i => i.slug === image.slug);

      if (currentImage) {
        const currentIx = images.indexOf(currentImage);
        this.setState({
          prev: images[currentIx - 1],
          next: images[currentIx + 1],
        });
      }
    }
  }

  loadImage(slug) {
    const { history } = this.props;
    history.push(`/image/${slug}`);
  }

  render() {
    let { image } = this.props;
    const { prev, next } = this.state;
    image = image || {};

    const imageElement = (
      <>
        <button
          style={{ display: `${prev ? 'block' : 'none'}` }}
          type="button"
          className="prev-image-button"
          onClick={() => this.loadImage(prev.slug)}
        >
          <FaAngleLeft />
        </button>
        <img alt={image.caption} src={image.src} />
        <button
          style={{ display: `${next ? 'block' : 'none'}` }}
          type="button"
          className="next-image-button"
          onClick={() => this.loadImage(next.slug)}
        >
          <FaAngleRight />
        </button>
      </>
    );

    return (
      <div className="Preview">
        <ImagePage
          title={image.caption}
          image={imageElement}
          description={image.description}
          sidebar={<div>foo</div>}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images,
  image: state.image,
});

const mapDispatchToProps = {
  dispatchSetImage: setImage,
  dispatchFetchImage: fetchImage,
};

Preview.propTypes = propTypes;
Preview.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Preview);

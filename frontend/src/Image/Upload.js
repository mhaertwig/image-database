import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaImage, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import ReactTags from 'react-tag-autocomplete';
import ImagePage from './ImagePage';
import { addImage, fetchTags } from '../model/actions';
import './Upload.scss';

const propTypes = {
  tagSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isImageUploading: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  dispatchAddImage: PropTypes.func.isRequired,
  dispatchFetchTags: PropTypes.func.isRequired,
};

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageTitle: '',
      imageDescription: '',
      imageUrl: null,
      imageFile: null,
      tags: [],
      showError: false,
    };

    this.fileInput = null;
    this.fileReader = new FileReader();
    this.fileReader.addEventListener('load', () => {
      this.setState({
        imageUrl: this.fileReader.result,
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { isImageUploading, history } = this.props;
    if (!isImageUploading && prevProps.isImageUploading) {
      history.push('/');
    }
  }

  onDrop(e) {
    e.preventDefault();
    const formats = ['image/png', 'image/jpeg'];

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i += 1) {
        if (formats.includes(e.dataTransfer.items[i].type)) {
          const imageFile = e.dataTransfer.items[i].getAsFile();
          this.loadImage(imageFile);
        }
      }
    }
  }

  loadImage(imageFile) {
    this.fileReader.readAsDataURL(imageFile);
    this.setState({ imageFile });
  }

  submitData() {
    const { dispatchAddImage } = this.props;
    const { tags, imageTitle, imageDescription, imageFile } = this.state;

    if (imageTitle && imageDescription && imageFile) {
      dispatchAddImage({
        tags: JSON.stringify(tags),
        caption: imageTitle,
        description: imageDescription,
        src: imageFile,
      });
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const {
      imageUrl,
      imageTitle,
      imageDescription,
      tags,
      showError,
    } = this.state;
    const { tagSuggestions, dispatchFetchTags } = this.props;
    let img = <FaImage className="icon" />;

    if (imageUrl) {
      img = <img className="image" src={imageUrl} alt="Preview" />;
    }

    const error = (
      <FaExclamationTriangle
        className="error-triangle"
        title="This field is required"
      />
    );

    const title = (
      <>
        {showError && !imageTitle ? error : null}
        <input
          className="input-field image-title"
          placeholder="Enter title"
          value={imageTitle}
          onChange={e => this.setState({ imageTitle: e.target.value })}
        />
      </>
    );

    const description = (
      <>
        {showError && !imageDescription ? error : null}
        <textarea
          className="input-field image-description"
          placeholder="Add description"
          value={imageDescription}
          onChange={e => this.setState({ imageDescription: e.target.value })}
        />
      </>
    );

    const sidebar = (
      <div className="input-sidebar">
        <div className="tags">
          <ReactTags
            autofocus={false}
            delimiterChars={[',', ' ']}
            allowNew
            addOnBlur
            tags={tags}
            suggestions={tagSuggestions}
            handleAddition={tag => this.setState({ tags: [...tags, tag] })}
            handleInputChange={input => dispatchFetchTags(input)}
            handleDelete={i => {
              const newTags = [...tags];
              newTags.splice(i, 1);
              this.setState({ tags: newTags });
            }}
          />
        </div>

        <button
          className="submit-button"
          type="submit"
          onClick={() => this.submitData()}
        >
          <FaCheck />
          &nbsp;Upload image
        </button>
        <div className="approve-note">
          Note: The page admins have to approve the image before it is visible
          in the gallery.
        </div>
      </div>
    );

    const image = (
      <>
        <input
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={e => {
            if (e.target.files.length) {
              this.loadImage(e.target.files[0]);
            }
          }}
          ref={ref => {
            this.fileInput = ref;
          }}
          style={{ display: 'none' }}
        />

        {showError && !imageUrl ? error : null}

        <div
          className="image-upload"
          onDragOver={e => e.preventDefault()}
          onDrop={e => this.onDrop(e)}
          onClick={() => this.fileInput.click()}
          onKeyPress={e => e.which === 13 && this.fileInput.click()}
          role="button"
          tabIndex="0"
        >
          {img}
        </div>
      </>
    );

    return (
      <ImagePage
        title={title}
        image={image}
        description={description}
        sidebar={sidebar}
      />
    );
  }
}

Upload.propTypes = propTypes;

const mapStateToProps = state => ({
  isImageUploading: state.isImageUploading,
  tagSuggestions: state.tagSuggestions,
});

const mapDispatchToProps = {
  dispatchAddImage: addImage,
  dispatchFetchTags: fetchTags,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);

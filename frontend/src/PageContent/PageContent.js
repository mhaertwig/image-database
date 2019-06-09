import React from 'react';
import PropTypes from 'prop-types';
import './PageContent.scss';

const propTypes = {
  page: PropTypes.shape({
    title: PropTypes.stirng,
    content: PropTypes.string,
  }).isRequired,
};

// eslint-disable no-danger
const PageContent = ({ page }) => (
  <div className="PageContent">
    <div className="page-title">{page.title}</div>
    <div dangerouslySetInnerHTML={{ __html: page.content }} />
  </div>
);

PageContent.propTypes = propTypes;
export default PageContent;

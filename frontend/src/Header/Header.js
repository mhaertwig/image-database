import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import './Header.scss';

const propTypes = {
  isImageUploading: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const Header = ({ pages, isImageUploading }) => (
  <div className="Header">
    <div className="inner">
      <div className="header-title">
        <NavLink to="/">
          <h1>Climage</h1>
          {isImageUploading ? <FaSpinner className="icon-spin" /> : null}
        </NavLink>
      </div>
      <div className="links">
        <HeaderLink title="Gallery" icon="FiImage" exact />
        <HeaderLink title="Upload" link="upload" icon="FiUploadCloud" />
        {pages.map(page => (
          <HeaderLink
            key={page.slug}
            title={page.title}
            icon={page.icon}
            link={page.slug}
          />
        ))}
      </div>
    </div>
  </div>
);

Header.propTypes = propTypes;

const mapStateToProps = state => ({
  isImageUploading: state.isImageUploading,
  pages: state.pages,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

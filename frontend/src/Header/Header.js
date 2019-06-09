import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderLink from './HeaderLink';
import './Header.scss';

const propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const Header = ({ pages }) => (
  <div className="Header">
    <div className="inner">
      <h1>Climage</h1>
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
  pages: state.pages,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as FiIcons from 'react-icons/fi';

import './HeaderLink.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  icon: PropTypes.string,
  exact: PropTypes.bool,
};

const defaultProps = {
  icon: null,
  link: null,
  exact: false,
};

const HeaderLink = ({ icon, exact, title, link }) => {
  const Icon = FiIcons[icon];
  return (
    <div className="HeaderLink">
      <NavLink exact={exact} to={link ? `/${link}` : '/'}>
        <Icon title={title} />
      </NavLink>
    </div>
  );
};

HeaderLink.propTypes = propTypes;
HeaderLink.defaultProps = defaultProps;

export default HeaderLink;

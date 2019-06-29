import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchPages } from './model/actions';
import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Gallery from './Gallery/Gallery';
import Upload from './Image/Upload';
import Preview from './Image/Preview';
import './Home.scss';

const propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      icon: PropTypes.string,
      title: PropTypes.stirng,
      slug: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  dispatchFetchPages: PropTypes.func.isRequired,
};

const defaultProps = {
  pages: [],
};

class Home extends Component {
  constructor(props) {
    super(props);
    const { dispatchFetchPages } = this.props;
    dispatchFetchPages();
  }

  render() {
    const { pages } = this.props;
    return (
      <div className="Home">
        <Router>
          <Header />
          <div className="body">
            <Route
              exact
              path="/"
              render={({ history }) => <Gallery history={history} />}
            />
            <Route
              exact
              path="/image/:slug"
              render={({ history, match }) => (
                <Preview slug={match.params.slug} history={history} />
              )}
            />
            <Route exact path="/upload/" component={Upload} />
            {pages.map(page => (
              <Route
                path={`/${page.slug}/`}
                render={() => <PageContent page={page} />}
              />
            ))}
          </div>
        </Router>
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = state => ({
  pages: state.pages,
});

const mapDispatchToProps = {
  dispatchFetchPages: fetchPages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

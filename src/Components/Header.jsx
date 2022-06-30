import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="profile-img"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.userReduce.name,
  email: state.userReduce.email,
  score: state.userReduce.score,
  assertions: state.userReduce.assertions,
});

export default connect(mapStateToProps)(Header);

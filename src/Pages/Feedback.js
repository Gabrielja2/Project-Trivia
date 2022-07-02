import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
  checkAsserts = () => {
    const { assertions } = this.props;
    const NUMBER_THREE = 3;
    if (assertions >= NUMBER_THREE) {
      return 'Well Done!';
    }
    return 'Could be better...';
  }

  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">{this.checkAsserts()}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);

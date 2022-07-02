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
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">{this.checkAsserts()}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <span data-testid="feedback-total-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);

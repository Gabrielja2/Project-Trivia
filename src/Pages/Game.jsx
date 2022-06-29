import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { validationToken } from '../Redux/Actions';

class Game extends React.Component {
  state= {
    index: 0,
    questions: [{ incorrect_answers: [], category: '', question: [] }],
  }

  componentDidMount = async () => {
    const { history } = this.props;

    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    const tres = 3;
    if (json.response_code === tres) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: json.results });
    }
  }

  answersRandom = () => {
    const { index, questions } = this.state;
    const wrong = questions[index].incorrect_answers;
    const answers = wrong.map((answer, indice) => (
      <button
        data-testid={ `wrong-answer-${indice}` }
        key={ indice }
        type="button"
      >
        {answer}
      </button>
    ));
    const correct = questions[index].correct_answer;
    answers.push(
      <button
        data-testid="correct-answer"
        type="button"
        key="correct"
      >
        {correct}
      </button>,
    );
    const num = 0.5;
    return answers.sort(() => (Math.random() - num));
  }

  render() {
    const { questions, index } = this.state;
    const array = this.answersRandom();
    console.log(questions);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{questions[index].category}</h1>
        <p data-testid="question-text">{questions[index].question}</p>
        <p data-testid="answer-options">{array}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  validToken: state.userReduce.validToken,
  questions: state.userReduce.questions,
});

const mapDispatchToProps = (dispatch) => ({
  actionValidationToken: (json) => dispatch(validationToken(json)),
});

Game.propTypes = {
  questions: PropTypes.object,
  validToken: PropTypes.object,
  actionValidationToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);

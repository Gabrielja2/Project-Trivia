import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import './Game.css';
import { atualizaScore } from '../Redux/Actions';

const correctAnswer = 'correct-answer';

class Game extends React.Component {
  state= {
    index: 0,
    questions: [{ incorrect_answers: [], category: '', question: [] }],
    isActive: false,
    isDisabled: false,
    sortedArray: [],
    score: 0,
    timer: 30,
    assertions: 0,
  }

  componentDidMount = async () => {
    const { isDisabled } = this.state;
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    const MAX_TIME_IN_MILISECONDS = 31000;
    const MIN_TIME_IN_MILISECONDS = 1000;
    if (!isDisabled) {
      setTimeout(() => {
        this.setState({
          isDisabled: true,
        });
      }, MAX_TIME_IN_MILISECONDS);
    }
    if (json.response_code === +'3') {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: json.results,
      }, () => this.answersRandom());
    }
    setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }, MIN_TIME_IN_MILISECONDS);
  }

  changeClassName = (parametro) => {
    if (parametro) {
      return 'green';
    }
    return 'red';
  }

  handleClick = (event) => {
    console.log('props', this.props);
    const { questions, timer, index } = this.state;
    const { actionScore } = this.props;
    const difficult = questions[index].difficulty;
    const CONSTANT = 10;
    const THREE = 3;
    const TWO = 2;
    const ONE = 1;
    let dificultValue;
    if (difficult === 'hard') dificultValue = THREE;
    if (difficult === 'medium') dificultValue = TWO;
    if (difficult === 'easy') dificultValue = ONE;
    this.setState({
      isActive: true,
    });
    if (event.target.name === correctAnswer) {
      this.setState((prev) => ({
        score: prev.score + CONSTANT + (timer * dificultValue),
        assertions: prev.assertions + ONE,
      }), () => {
        const { score, assertions } = this.state;
        actionScore(score, assertions);
      });
    }
    // console.log(score);
  }

  handleNext = () => {
    const { index } = this.state;
    if (index === +'4') {
      this.setState({
        index: 0,
      });
    } else {
      this.setState((prev) => ({
        index: prev.index + 1,
        isActive: false,
      }), () => this.answersRandom());
    }
  }

  answersRandom = () => {
    const shuffle = 0.5;
    const { index, questions } = this.state;
    const wrong = questions[index].incorrect_answers;
    const answers = wrong.map((answer, indice) => (

      {
        id: `wrong-answer-${indice}`,
        isCorrect: false,
        title: answer,
      }));

    const correct = questions[index].correct_answer;
    answers.push(
      {
        id: correctAnswer,
        isCorrect: true,
        title: correct,
      },
    );
    this.setState({
      sortedArray: answers.sort(() => (Math.random() - shuffle)),
    });
  }

  render() {
    const { questions, index, isActive, isDisabled, sortedArray } = this.state;
    // console.log('sort', sortedArray[index]);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{questions[index].category}</h1>
        <p data-testid="question-text">{questions[index].question}</p>
        <p data-testid="answer-options">
          {sortedArray.map(({ id, isCorrect, title }) => (
            <button
              data-testid={ isCorrect ? correctAnswer : `wrong-answer-${index}` }
              type="button"
              key={ id }
              onClick={ this.handleClick }
              className={ isActive ? this.changeClassName(isCorrect) : '' }
              disabled={ isDisabled }
              name={ id }
            >
              {title}
            </button>
          ))}
        </p>
        {isActive && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleNext }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionScore: (score, assertions) => dispatch(atualizaScore(score, assertions)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);

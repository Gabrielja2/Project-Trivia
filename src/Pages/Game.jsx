import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import './Game.css';

class Game extends React.Component {
  state= {
    index: 0,
    questions: [{ incorrect_answers: [], category: '', question: [] }],
    // isActive: false,
    isDisabled: true,
    sortedArray: [],
  }

  componentDidMount = async () => {
    const { isDisabled } = this.state;
    if (isDisabled) {
      setTimeout(() => {
        this.setState({
          isDisabled: false,
        });
      }, +'5000');
    }
    const { history } = this.props;

    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    const tres = 3;
    if (json.response_code === tres) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: json.results,
      }, () => this.setState({
        sortedArray: this.answersRandom(),
      }));
    }
    if (isDisabled) {
      setTimeout(() => {
        this.setState({
          isDisabled: true,
        });
      }, +'35000');
    }
  }

  handleClick = () => {
    this.setState({
      isActive: true,
    });
  }

  changeClassName = (parametro) => {
    if (parametro) {
      return 'green';
    }
    return 'red';
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
        id: 'correct-answer',
        isCorrect: true,
        title: correct,
      },
    );
    return answers.sort(() => (Math.random() - shuffle));
  }

  render() {
    const { questions, index, isActive, isDisabled, sortedArray } = this.state;
    console.log(sortedArray);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{questions[index].category}</h1>
        <p data-testid="question-text">{questions[index].question}</p>
        <p data-testid="answer-options">
          {sortedArray.map(({ id, isCorrect, title }) => (
            <button
              data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${index}` }
              type="button"
              key={ id }
              onClick={ this.handleClick }
              className={ isActive ? this.changeClassName(isCorrect) : '' }
              disabled={ isDisabled }
            >
              {title}
            </button>
          ))}

        </p>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

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
    return answers;
  }

  render() {
    const { questions, index } = this.state;
    const array = this.answersRandom();
    const shuffle = 0.5;
    console.log(questions);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{questions[index].category}</h1>
        <p data-testid="question-text">{questions[index].question}</p>
        <p data-testid="answer-options">{array.sort(() => (Math.random() - shuffle))}</p>
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

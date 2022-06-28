import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestToken } from '../Redux/Actions';

class Login extends Component {
    state={
      name: '',
      email: '',
    }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validarInputs = () => {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      return false;
    }
    return true;
  }

  handleClick = () => {
    const { actionToken, history } = this.props;
    actionToken();
    history.push('./gamepage');
  }

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('./configpage');
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="input-name">
            Name:
            <input
              name="name"
              value={ name }
              id="input-name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="input-email">
            Email:
            <input
              name="email"
              value={ email }
              id="input-email"
              type="text"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          disabled={ this.validarInputs() }
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
        >
          Play

        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickConfig }
        >
          Configure

        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionToken: (json) => dispatch(requestToken(json)),
});

Login.propTypes = {
  actionToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

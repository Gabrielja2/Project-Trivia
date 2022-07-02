import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestToken, getUserInfo } from '../Redux/Actions';
import './Login.css';

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

  handleClick = async () => {
    const { actionToken, history, actionInfo } = this.props;
    const { name, email } = this.state;
    actionInfo(name, email);
    await actionToken();
    history.push('./game');
  }

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('./config');
  }

  render() {
    const { name, email } = this.state;
    return (
      <form className="form">
        <div className="div-label">
          <label htmlFor="input-name">
            Name:
            <input
              className="input-name"
              name="name"
              value={ name }
              id="input-name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div className="div-label">
          <label htmlFor="input-email">
            Email:
            <input
              className="input-email"
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
          className="button-play"
          disabled={ this.validarInputs() }
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
        >
          Play

        </button>
        <button
          className="button-config"
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
  actionToken: async (json) => dispatch(requestToken(json)),
  actionInfo: (name, email) => dispatch(getUserInfo(name, email)),
});

Login.propTypes = {
  actionToken: PropTypes.func.isRequired,
  actionInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

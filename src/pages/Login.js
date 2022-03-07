import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginToState } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  verifyEmailAndPassword = () => {
    const { email, password } = this.state;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const MIN_LENGTH = 6;
    return (regex.test(email) && password.length >= MIN_LENGTH);
  }

  onClickButton = () => {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <form>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          onClick={ () => { dispatchEmail(email); this.onClickButton(); } }
          disabled={ !this.verifyEmailAndPassword() }
          type="submit"
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (payload) => dispatch(loginToState(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

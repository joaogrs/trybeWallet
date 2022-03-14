import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { expenses, email } = this.props;
    const sumExpense = expenses.reduce((sum, { value, currency, exchangeRates }) => (
      exchangeRates[currency].ask * value + sum
    ), 0);
    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          {Number(sumExpense).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);

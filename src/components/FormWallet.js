import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPrices } from '../actions';

class FormWallet extends React.Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: '',
    tag: '',
    description: '',
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({
      [id]: value,
    });
  }

  onClickButton = () => {
    const { dispatchExpense } = this.props;
    dispatchExpense(this.state);
    this.setState(({ id }) => ({
      id: id + 1,
      value: 0,
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            onChange={ this.handleChange }
            value={ value }
            id="value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            id="description"
            value={ description }
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
          />

        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies
              .filter((currencyItem) => currencyItem !== 'USDT')
              .map((currencyItem, index) => (
                <option
                  key={ index }
                  data-testid={ currencyItem }
                  value={ currencyItem }
                >
                  {currencyItem}

                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            id="method"
          >
            <option value="">{' '}</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            id="tag"
          >
            <option value="">{' '}</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.onClickButton }>
          Adicionar Despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (payload) => dispatch(fetchPrices(payload)),
});

FormWallet.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);

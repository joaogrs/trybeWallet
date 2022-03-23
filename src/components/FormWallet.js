import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPrices, editExpense } from '../actions';
import '../styles/formWallet.css';

class FormWallet extends React.Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: '',
    tag: '',
    description: '',
    editionMode: false,
    obj: {},
  }

  componentDidUpdate() {
    this.verifyEditionMode();
  }

  verifyEditionMode = () => {
    const { objOfEditing,
      objOfEditing: { id, value, description, currency, method, tag } } = this.props;
    const { editionMode } = this.state;
    if (editionMode === false && Object.keys(objOfEditing).length !== 0) {
      this.setState({
        editionMode: true,
        obj: objOfEditing,
        id,
        value,
        description,
        currency,
        method,
        tag,
      });
    }
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({
      [id]: value,
    });
  }

  onClickButton = () => {
    const { dispatchExpense } = this.props;
    const stateOfExpenses = this.state;
    delete stateOfExpenses.editionMode;
    delete stateOfExpenses.obj;
    dispatchExpense(stateOfExpenses);
    this.setState(({ id }) => ({
      id: id + 1,
      value: 0,
    }));
  }

  onClickEdit = () => {
    const { editExpenses, clearObjOfEditing } = this.props;
    const stateOfEditing = this.state;
    delete stateOfEditing.editionMode;
    delete stateOfEditing.obj;
    editExpenses(stateOfEditing);
    clearObjOfEditing();
    this.setState({
      editionMode: false,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description, editionMode } = this.state;
    return (
      <form className="form-container">
        <label htmlFor="value" className="label-wallet">
          Valor
          <input
            type="number"
            onChange={ this.handleChange }
            value={ value }
            id="value"
            data-testid="value-input"
            className="inputs-wallet"
          />
        </label>
        <label htmlFor="description" className="label-wallet">
          Descrição
          <input
            id="description"
            value={ description }
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            className="inputs-wallet"
          />

        </label>
        <label htmlFor="currency" className="label-wallet">
          Moeda
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
            className="inputs-wallet"
          >
            {currencies
              .filter((currencyItem) => currencyItem !== 'USDT')
              .map((currencyItem) => (
                <option
                  key={ currencyItem }
                  data-testid={ currencyItem }
                  value={ currencyItem }
                >
                  {currencyItem}

                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method" className="label-wallet">
          Método de Pagamento
          <select
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            id="method"
            className="inputs-wallet"
          >
            <option value="">{' '}</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="label-wallet">
          Categoria
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            id="tag"
            className="inputs-wallet"
          >
            <option value="">{' '}</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {editionMode
          ? (
            <button type="button" className="btn-wallet" onClick={ this.onClickEdit }>
              Editar despesa
            </button>
          )
          : (
            <button type="button" className="btn-wallet" onClick={ this.onClickButton }>
              Adicionar Despesa
            </button>)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (payload) => dispatch(fetchPrices(payload)),
  editExpenses: (state) => dispatch(editExpense(state)),
});

FormWallet.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  objOfEditing: PropTypes.objectOf.isRequired,
  editExpenses: PropTypes.func.isRequired,
  clearObjOfEditing: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);

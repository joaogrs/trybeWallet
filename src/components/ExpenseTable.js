import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class ExpenseTable extends React.Component {
  onClickDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  }

  render() {
    const { expensesList } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>

          {expensesList
            .map(({ id, value, exchangeRates, description, tag, method, currency }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.onClickDelete(id) }
                    data-testid="delete-btn"
                  >
                    Deletar Despesa
                  </button>
                </td>
              </tr>
            ))}
        </tbody>

      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expensesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expensesList: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseTable);

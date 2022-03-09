import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends React.Component {
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
              </tr>
            ))}
        </tbody>

      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expensesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
  expensesList: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpenseTable);

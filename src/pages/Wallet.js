import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import FormWallet from '../components/FormWallet';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  state = {
    objOfEditing: {},
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  onClickEditing = (objOfEditing) => (
    this.setState({
      objOfEditing,
    })
  )

  clearObjOfEditing = () => {
    this.setState({
      objOfEditing: {},
    });
  }

  render() {
    const { objOfEditing } = this.state;
    return (
      <>
        <Header />
        <FormWallet
          clearObjOfEditing={ this.clearObjOfEditing }
          objOfEditing={ objOfEditing }
        />
        <ExpenseTable editingFunc={ (param) => this.onClickEditing(param) } />
      </>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);

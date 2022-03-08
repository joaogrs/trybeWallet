import { APPEND_EXPENSE, GET_CURRENCIES_NAME } from '../actions';

const initialState = {
  expenses: [],
  currencies: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCIES_NAME:
    return {
      ...state,
      currencies: action.payload,
    };
  case APPEND_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(action.payload),
    };
  default:
    return state;
  }
};

export default walletReducer;

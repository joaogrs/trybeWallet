import { APPEND_EXPENSE, GET_CURRENCIES_NAME, DELETE_EXPENSE } from '../actions';

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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  default:
    return state;
  }
};

export default walletReducer;

export const LOGIN = 'LOGIN';
export const GET_CURRENCIES_NAME = 'GET_CURRENCIES_NAME';
export const APPEND_EXPENSE = 'APPEND_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const loginToState = (email) => ({
  type: LOGIN,
  payload: email,
});

export const getCurrenciesName = (currencies) => ({
  type: GET_CURRENCIES_NAME,
  payload: currencies,
});

export const appendExpense = (newExpense, exchangeRates) => ({
  type: APPEND_EXPENSE,
  payload: {
    ...newExpense,
    exchangeRates,
  },
});

export const editExpense = (expenseForEditing) => ({
  type: EDIT_EXPENSE,
  payload: {
    ...expenseForEditing,
  },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const objectPrice = await response.json();
  const currencies = Object.keys(objectPrice);
  dispatch(getCurrenciesName(currencies));
};

export const fetchPrices = (newExpense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const prices = await response.json();
    dispatch(appendExpense(newExpense, prices));
  } catch (error) {
    console.log(error);
  }
};

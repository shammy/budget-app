import React, { useState, useEffect } from 'react';
import Header from './Header';
import IncomeExpenseInput from './Inputs';
import Lists from './Lists';
import { InputContext, HeaderContext, ListContext } from './Context';
import './App.scss';

function App() {
  //header hooks
  const [income, setIncome] = useState(getHeaderInitialValue('income'));
  const [expense, setExpense] = useState(getHeaderInitialValue('expense'));
  //input hooks
  const [option, setOption] = useState('+');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  //List hooks

  const [incomeList, setIncomeList] = useState(getListInitialValue('incomeList'));
  const [expenseList, setExpenseList] = useState(getListInitialValue('expenseList'));

  function getHeaderInitialValue(value) {
    return window.localStorage.getItem(value) ? Number(window.localStorage.getItem(value)) : 0;
  }

  function getListInitialValue(value) {
    return window.localStorage.getItem(value) ? JSON.parse(window.localStorage.getItem(value)) : [];
  }

  useEffect(setLocalStorage, [income, expense, incomeList, expenseList]);

  function reset() {
    setAmount(0);
    setDescription('');
    setOption('+');
  }

  function setLocalStorage() {
    window.localStorage.setItem('income', income);
    window.localStorage.setItem('expense', expense);
    window.localStorage.setItem('incomeList', JSON.stringify(incomeList));
    window.localStorage.setItem('expenseList', JSON.stringify(expenseList));
  }

  function handleDeleteIncome(index) {
    const incomeItemDeleted = incomeList[index];
    setIncome(income - incomeItemDeleted.amount);
    setIncomeList(incomeList.filter((_, i) => i !== index));
  }

  function handleDeleteExpense(index) {
    const expenseItemDeleted = expenseList[index];
    setExpense(expense - expenseItemDeleted.amount);
    setExpenseList(expenseList.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (amount === 0) return;
    if (option === '+') {
      setIncome(income + parseFloat(amount));
      setIncomeList([...incomeList, { description, amount }]);
    } else {
      setExpense(expense + parseFloat(amount));
      setExpenseList([...expenseList, { description, amount }]);
    }
    reset();
  }

  function handleOption(value) {
    setOption(value);
  }
  function handleDescription(value) {
    setDescription(value);
  }
  function handleAmount(value) {
    setAmount(value);
  }

  const inputContextValue = {
    option,
    description,
    amount,
    handleOption,
    handleDescription,
    handleAmount,
    handleSubmit,
  };

  const headerContextValue = {
    income,
    expense,
  };

  const listContextValue = {
    incomeList,
    expenseList,
    handleDeleteIncome,
    handleDeleteExpense,
  };

  return (
    <div className="App">
      <HeaderContext.Provider value={headerContextValue}>
        <Header />
      </HeaderContext.Provider>
      <InputContext.Provider value={inputContextValue}>
        <IncomeExpenseInput />
      </InputContext.Provider>
      <ListContext.Provider value={listContextValue}>
        <Lists />
      </ListContext.Provider>
    </div>
  );
}

export default App;

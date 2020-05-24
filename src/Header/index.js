import React, { useContext } from 'react';
import { HeaderContext } from '../Context';
import './index.scss';

function Header() {
  const { income, expense } = useContext(HeaderContext);
  return (
    <div className="app-header">
      <h1 className="current-budget-header">Current Budget</h1>
      <div className="budget-number">{income - expense}</div>
      <div className="income">{income}</div>
      <div className="expense">{expense}</div>
    </div>
  );
}
export default Header;

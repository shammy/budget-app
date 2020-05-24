import React, { useContext } from 'react';
import { ListContext } from '../Context';
import './index.scss';

function ExpenseList() {
  const { expenseList, handleDeleteExpense } = useContext(ListContext);
  return (
    <div>
      <h2 id="expense-header">Expense</h2>
      <ul className="expense-list">
        {expenseList.map((expense, index) => (
          <li key={index} className="list-item" onClick={() => handleDeleteExpense(index)}>
            <span>
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="trash" fill="#000000">
                    <path
                      d="M2,2 L18,2 L18,4 L2,4 L2,2 Z M8,0 L12,0 L14,2 L6,2 L8,0 Z M3,6 L17,6 L16,20 L4,20 L3,6 Z M8,8 L9,8 L9,18 L8,18 L8,8 Z M11,8 L12,8 L12,18 L11,18 L11,8 Z"
                      id="Combined-Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            </span>
            <span className="list-item-content">{expense.description}</span>
            <span className="list-item-content list-amount">{expense.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;

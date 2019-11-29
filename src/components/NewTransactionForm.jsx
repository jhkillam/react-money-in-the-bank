import React from 'react'

const NewTransactionForm = ({handleChange, handleSubmit, newTransaction}) => {
  
  return (
    <div>
      <form>
        <label>Name:</label><br/>
          <input 
            type="text" 
            name="name"
            onChange={handleChange}
            value={newTransaction.name}
          /><br/>
        <label>Amount:</label><br/>
          <input 
            type="text" 
            name="amount"
            onChange={handleChange}
            value={newTransaction.amount}
          /><br/>
        <label>Due Date:</label><br/>
        <input 
            type="text" 
            name="dueDate"
            onChange={handleChange}
            value={newTransaction.dueDate}
          /><br/>
        <label>Bill or Income:</label><br/>
        <select>
          <option value="bill">Bill</option>
          <option value="income">Income</option>
        </select><br/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NewTransactionForm
import React from 'react'

const NewTransactionForm = ({handleChange, handleSubmit, newTransaction}) => {
  
  return (
    <div>
      <form>
        <label>Name:</label>
          <input 
            type="text" 
            name="name"
            onChange={handleChange}
            value={newTransaction.name}
          />
        <label>Amount:</label>
          <input 
            type="number" 
            name="amount"
            onChange={handleChange}
            value={newTransaction.amount}
          />
        <label>Due Date:</label>
        <input 
            type="text" 
            name="dueDate"
            onChange={handleChange}
            value={newTransaction.dueDate}
          />
        <label>Bill or Income:</label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NewTransactionForm
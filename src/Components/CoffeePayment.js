import React, { useState } from 'react';

const CoffeePayment = () => {
  const [coffees, setCoffees] = useState([
    { name: 'Bob', drink: 'cappuccino', cost: 3.5, daysPaid: 0 },
    { name: 'Jeremy', drink: 'black coffee', cost: 2.5, daysPaid: 0 },
  ]);

  const [name, setName] = useState('');
  const [drink, setDrink] = useState('');
  const [cost, setCost] = useState(0);
  const [daysPaid, setDaysPaid] = useState(0);


  //add
  const addEmployee = () => {
    if (name && drink && cost > 0) {
      setCoffees([...coffees, { name, drink, cost: parseFloat(cost) }]);
      setName('');
      setDrink('');
      setCost(0);
      setDaysPaid(0);
    } else {
      alert('Please fill in all fields and ensure the cost is a valid number greater than zero.');
    }
  };
  
  // remove
  const removeEmployee = (index) => {
    const updatedCoffees = [...coffees];
    updatedCoffees.splice(index, 1);
    setCoffees(updatedCoffees);
  };




  const getNextPayer = () => {
    // logic to determine the next payer
    // Calculate total amount paid per coworker
  const amountPaidPerCoworker = coffees.reduce((acc, coffee) => {
    acc[coffee.name] = (acc[coffee.name] || 0) + coffee.cost;
    return acc;
  }, {});

  // Calculate average amount paid per coworker per day
  const averagePaidPerCoworker = {};
  for (const name in amountPaidPerCoworker) {
    averagePaidPerCoworker[name] = amountPaidPerCoworker[name] / daysPaid;
  }

  // Find the coworker with the least average amount paid
  let minPaid = Infinity;
  let nextPayerIndex = 0;
  coffees.forEach((coffee, index) => {
    if (averagePaidPerCoworker[coffee.name] < minPaid) {
      minPaid = averagePaidPerCoworker[coffee.name];
      nextPayerIndex = index;
    }
  });

  // Set the next payer index
  setPayerIndex(nextPayerIndex);
  };
  const [payerIndex, setPayerIndex] = useState(0);
  
  
  
  return (
    <div>
      <h2>Today's Coffee Order</h2>
      <ul>
        {coffees.map((coffee, index) => (
          <li key={index}>
            <strong>{coffee.name}</strong> - {coffee.drink} (${coffee.cost}) | {coffee.daysPaid} days paid
            <button onClick={() => removeEmployee(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add New Employee:</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Favorite Drink" value={drink} onChange={(e) => setDrink(e.target.value)} />
      <input type="number" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />
      <button onClick={addEmployee}>Add Employee</button>
      <h3>Update Coffee Price:</h3>
      {/* <input type="number" value={coffeePrice} onChange={updateCoffeePrice} /> */}
      <button onClick={getNextPayer}>Who's Paying?</button>
      <h3>Today's Payer: {coffees[payerIndex].name}</h3>
    </div>
  );
};

export default CoffeePayment;
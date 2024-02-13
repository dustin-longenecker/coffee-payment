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
  
  const removeEmployee = (index) => {
    const updatedCoffees = [...coffees];
    updatedCoffees.splice(index, 1);
    setCoffees(updatedCoffees);
  };

  
  
  
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
      {/* <button onClick={getNextPayer}>Who's Paying?</button> */}
      {/* <h3>Today's Payer: {coffees[payerIndex].name}</h3> */}
    </div>
  );
};

export default CoffeePayment;
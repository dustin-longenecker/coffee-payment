import React, { useState, useEffect } from 'react';

const CoffeePayment = () => {
  const [coffees, setCoffees] = useState([
    { name: 'Bob', drink: 'cappuccino', cost: 3.5 },
    { name: 'Jeremy', drink: 'black coffee', cost: 2.5 },
    { name: 'Coworker 1', drink: 'latte', cost: 4 },
    { name: 'Coworker 2', drink: 'espresso', cost: 3 },
    { name: 'Coworker 3', drink: 'macchiato', cost: 3.5 },
    { name: 'Coworker 4', drink: 'mocha', cost: 4.5 },
    { name: 'Coworker 5', drink: 'americano', cost: 3 },
  ]);

  const [name, setName] = useState('');
  const [drink, setDrink] = useState('');
  const [cost, setCost] = useState(0);
//   const [paid, setPaid] = useState(false);
  //days counter
  const [days, setDays] = useState(0);

  useEffect(() => {
    // If all coworkers have paid, reset paid status and select a random payer
    if (days > 4) {
      // Reset daysPaid and set all coworkers' paid status to false
      setDays(0);
      setCoffees(prevCoffees => prevCoffees.map(coffee => ({ ...coffee, paid: false })));
    }
  }, [days]);

  // add
  const addEmployee = () => {
    if (name && drink && cost > 0) {
      setCoffees([...coffees, { name, drink, cost: parseFloat(cost) }]);
      setName('');
      setDrink('');
      setCost(0);
    //   setPaid(false);
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
    // console.log(days);
    // console.log(coffees);
    

    

    // filter coworkers who have not paid yet
    const unpaidCoffees = coffees.filter(coffee => !coffee.paid);

    // if all coworkers have paid, reset paid status and select a random payer
    if (unpaidCoffees.length === 0) {
        setCoffees(coffees.map(coffee => ({ ...coffee, paid: false })));
    }

    // randomly select a coworker who hasn't paid yet
    const randomIndex = Math.floor(Math.random() * unpaidCoffees.length);
    const nextPayer = unpaidCoffees[randomIndex];
    
    // Mark the selected coworker as paid
    setCoffees(coffees.map(coffee => coffee.name === nextPayer.name ? { ...coffee, paid: true } : coffee));

    // Increment daysPaid
    // console.log(daysPaid);
    setDays(days + 1);
    // console.log("daysPaid" + daysPaid);
    setPayerIndex(randomIndex);
    // console.log(daysPaid);
    
    // return nextPayer;
  };
  const [payerIndex, setPayerIndex] = useState(0);
  
  
  
  return (
    <div>
      <h2>Today's Coffee Order</h2>
      <ul>
        {coffees.map((coffee, index) => (
          <li key={index}>
            <strong>{coffee.name}</strong> - {coffee.drink} (${coffee.cost}) | {coffee.paid}
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
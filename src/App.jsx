import { useState } from 'react';

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = Math.round(+bill * ((percentage1 + percentage2) / 2 / 100));

  function handleReset() {
    setBill('');
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput onSetBill={setBill} bill={bill} tip={tip} />
      <SelectPercentage percentage={percentage1} onSetPercentage={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSetPercentage={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>
      {bill && <Output bill={+bill} tip={tip} />}
      {bill && <Reset onReset={handleReset} />}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input type="text" placeholder="Bill value" value={bill} onChange={e => onSetBill(e.target.value)} />
    </div>
  );
}

function SelectPercentage({ percentage, onSetPercentage, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={e => onSetPercentage(+e.target.value)}>
        <option value="0">Dissatisfied (0)%</option>
        <option value="5">It was okay (5)%</option>
        <option value="10">It was good (10)%</option>
        <option value="20">Absolutely amazing! (20)%</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  const total = bill + tip;

  return (
    <h3>
      You pay ${total} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

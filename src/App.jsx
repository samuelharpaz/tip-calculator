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
  const [reviews, setReviews] = useState(['0', '0']);

  function handleChangeReviewYou(e) {
    setReviews(reviewsArray => [e.target.value, reviewsArray[1]]);
  }

  function handleChangeReviewFriend(e) {
    setReviews(reviewsArray => [reviewsArray[0], e.target.value]);
  }

  function handleReset() {
    setBill(0);
    setReviews(['bad', 'bad']);
  }

  return (
    <div>
      <BillInput onSetBill={setBill} bill={bill} />
      <SelectPercentage review={reviews[0]} onChangeReview={handleChangeReviewYou}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage review={reviews[1]} onChangeReview={handleChangeReviewFriend}>
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && <Output bill={+bill} reviews={reviews} />}
      {bill > 0 && <Reset onReset={handleReset} />}
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

function SelectPercentage({ review, onChangeReview, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={review} onChange={onChangeReview}>
        <option value="0">Dissatisfied (0)%</option>
        <option value="5">It was okay (5)%</option>
        <option value="10">It was good (10)%</option>
        <option value="20">Absolutely amazing! (20)%</option>
      </select>
    </div>
  );
}

function Output({ bill, reviews }) {
  const billNum = +bill;
  const reviewYou = +reviews[0];
  const reviewFriend = +reviews[1];

  console.log(reviewYou, reviewFriend);

  const tipPercent = (reviewYou + reviewFriend) / 2 / 100;
  const tip = Math.round(billNum * tipPercent);
  const total = billNum + tip;

  return (
    <h3>
      You pay ${total} (${billNum} + ${tip} tip)
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

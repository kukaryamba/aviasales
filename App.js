import React, { useState, useEffect } from 'react';
import './App.css';


  const inputIds = [{ title: "Все", id: "allResults" },
  { title: "Без пересадок", id: "noStops" },
  { title: "1 пересадка", id: "oneStop" },
  { title: "2 пересадки", id: "twoStops" },
  { title: "3 пересадки", id: "threeStops" }];


// https://ru.reactjs.org/docs/hooks-state.html
export function App() {
  const [tickets, setTickets] = useState([{
    "origin": "VVO",
    "origin_name": "Владивосток",
    "destination": "TLV",
    "destination_name": "Тель-Авив",
    "departure_date": "12.05.18",
    "departure_time": "16:20",
    "arrival_date": "12.05.18",
    "arrival_time": "22:10",
    "carrier": "TK",
    "stops": 3,
    "price": 12400
  }]);

  const [input, setInput] = useState('60000')
  const [checkedInputs, setCheckedInputs] = useState([])



  useEffect(() => {
    fetch(`./tickets.json`).then(function (response) {
      response.json().then(results => {
        setTickets(results.tickets);
      });
    });
  }, []);
  

  function handleChange(event) {
    setInput(event.target.value)
  }

  function handleFilterChange(event) {
    console.log(event.target)
    if (!checkedInputs.includes(event.target.id)) {
      const checkedIds = [...checkedInputs, event.target.id];
      setCheckedInputs(checkedIds);
    }
    else {
      setCheckedInputs(checkedInputs.filter(item => item!== event.target.id));
    }
  }

  console.log({checkedInputs});
  const filtered = tickets
    .filter(item => item.price <= +input)
    .sort((a, b) => a.price > b.price ? 1 : -1);

  const cards = filtered.map(item =>
    <div className="card" key={item.id}>
      <div className="buyCard">
        <img className="logo" src={require('./Turkish_Airlines_logo.png')} />
        <button className="buyTicket"> Купить <br /> за {item.price}₽ </button>
      </div>
      <div className="flightCard">
        <div className="departure">
          <span className="time"> {item.departure_time} </span>
          <span className="place"> {item.origin},  {item.origin_name} </span>
          <span className="date"> {item.departure_date} </span>
        </div>
        <div className="way">
          <div className="stops">{item.stops} ПЕРЕСАДКИ</div>
          <div className="segment-route__connector" ></div>
        </div>
        <div className="arrival">
          <span className="time"> {item.arrival_time} </span>
          <span className="place"> {item.destination_name}, {item.destination}  </span>
          <span className="date"> {item.arrival_date} </span>
        </div>
      </div>
    </div>)



  return (
    <div className="app">
      <div className="filter">
        <span className="title">ВАЛЮТА </span>
        {/* <input className="sumLimit" value={input} onChange={handleChange}></input> */}

        <div className="currency">
          <div className="rub">RUB</div>
          <div className="usd">USD</div>
          <div className="eur">EUR</div>
        </div>
        <span className="title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <form className="checkboxes" onChange={handleFilterChange} >
          {
            inputIds.map(item => (
              <React.Fragment key={item.id}>
                <input className="stopsInput" id={item.id} type="checkbox" />
                <label htmlFor={item.id}>{item.title}</label>
              </React.Fragment>
            )
          
          
            )
          }
        </form >
      </div>
      <div className="results">
        {cards}
      </div>
    </div>


  );
}

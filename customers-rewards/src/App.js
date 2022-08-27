import './App.css';
import CustomerRewardsApp from './CustomerRewardsApp'

function App() {
  const data = [
    {
      customerName:'Lea', 
      orderHistory:[
        {date:'May 17, 2022', total:20},
        {date:'May 18, 2022', total:20},
        {date:'May 19, 2022', total:150},
        {date:'July 11, 2022', total:10},
        {date:'July 28, 2022', total:50},
      ],
      totalPoints:0
    }
  ]
  return (
    <div className="App">
      <CustomerRewardsApp data={data} />
    </div>
  );
}

export default App;
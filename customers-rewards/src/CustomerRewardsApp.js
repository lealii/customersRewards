import React from "react";

export default function CustomerRewardsApp({data}) {
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [orderlyRewards, setOrderlyRewards] = React.useState([]);
  const [monthlyRewards, setMonthlyRewards] = React.useState([]);
  const customerData = data[0];
  React.useEffect(()=>{
    setTotalPoints(customerData.totalPoints);
    getOrderlyRewards();
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    getMonthlyRewards();
  },[orderlyRewards])// eslint-disable-line react-hooks/exhaustive-deps
  const getOrderlyRewards = () => {
    let rewards=[]
    let totalPurchase = 0
    customerData.orderHistory.map(order => {
      totalPurchase += order.total;
      if(totalPurchase > 0 && totalPurchase <= 50) {
        return rewards.push(0);
      } else if(totalPurchase <= 100) {
        return rewards.push(totalPurchase-50);
      } else {
        return rewards.push((totalPurchase-100)*2);
      }
    });
    setOrderlyRewards(rewards);
    getMonthlyRewards();
  }

  const handleClaim = e => {
    let button = document.getElementById(e.target.id);
    setTotalPoints(totalPoints+parseInt(e.target.value),10);
    button.disabled=true;
  }

  const getDate = (dateObj) => {
    var dd = String(dateObj.getDate()).padStart(2, '0');
    var mm = String(dateObj.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateObj.getFullYear();
    return mm+'/'+dd+'/'+yyyy
  }

  const firstPurchaseDate = new Date(customerData.orderHistory[0].date);
  // const lastPurchaseDate = new Date(customerData.orderHistory[customerData.orderHistory.length-1].date);
  const getMonthsAfterDate = (date,month) => {
    let rewardExpiredDate
    if (date.getMonth() >= 9) {
      rewardExpiredDate = new Date(date.getFullYear() + 1, 0, date.getDate());
    } else {
        rewardExpiredDate = new Date(date.getFullYear(), date.getMonth() + month, date.getDate());
    }
    return rewardExpiredDate
  }

  const getMonthlyRewards = () => {
    let monthly = [];
    let monthStart = firstPurchaseDate.getTime();
    const orderHistory = customerData.orderHistory
    for(let i=0; i<orderHistory.length; i++){
      let orderDate = new Date(orderHistory[i].date).getTime()
      let monthEnd = getMonthsAfterDate(new Date(monthStart),1).getTime();
      let index = monthly.findIndex(object => {
        return object.month === new Date(monthEnd).getMonth();
      }); 
      if(orderDate <= monthEnd && orderDate >= monthStart && index === -1){
        let obj = {};
        obj.month = new Date(monthStart).getMonth()+1;
        obj.reward = orderlyRewards[i];
        monthly.push(obj);
      } else if (orderDate<=monthEnd && orderDate >= monthStart &&index !== -1){
        monthly[index].reward += orderlyRewards[i];
      } else {
        let obj = {};
        obj.month = new Date(monthEnd).getMonth()+1;
        obj.reward = orderlyRewards[i];
        monthly.push(obj);
        monthStart = monthEnd;
      }

    }
    return setMonthlyRewards(monthly);
  }
  // getMonthlyRewards();
  console.log(monthlyRewards);
  return (
    <div>
        <p>Welcome {customerData.customerName}</p>
        <p>Today is {getDate(new Date())}</p>
        <p>Total Points: {totalPoints}</p>
        <table className='myTable'>
          <thead>
            <tr>
              <th>Total</th>
              <th>Date Ordered</th>
              <th>Reward</th>
              <th>Claim Reward</th>
            </tr>
          </thead>
          <tbody>
            {customerData.orderHistory.map((order,index) => 
              <tr key={index+1}>
                <td>{order.total}</td>
                <td>{order.date}</td>
                <td>{orderlyRewards[index]}</td>
                <td><button type="submit" id={index} value={orderlyRewards[index]} onClick={handleClaim}>Claim</button></td>
              </tr>
            )}
          </tbody>
        </table>
        <table className='myTable'>
          <thead>
            <tr>
              <th>Month</th>
              <th>Monthly Reward</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRewards.map((obj,index) =>
              <tr key={index+1}>
                <td>{obj.month}</td>
                <td>{obj.reward}</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}
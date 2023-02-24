const label = () =>{
    let result = [];
    const options = { month: "short" };
    for(let i=1;i<=10;i++)
    {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate()+i);
        result.push(currentDate.toLocaleString('default',options)+" "+currentDate.getDate());
    }
    return result;
}

const generateData = () =>{
    let result = [];
    for(let i=1;i<=10;i++)
    {
        result.push(getRndInteger(1000,6000))
    }
    return result;
}
  
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


export const data = {
    labels: label(),
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0.3,
        // backgroundColor: getComputedStyle(document.body).getPropertyValue('--flight-card-bg'),
        borderColor: "#345485",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "bevel",
        pointBorderColor: "#345485",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: generateData()
      }
    ]
};
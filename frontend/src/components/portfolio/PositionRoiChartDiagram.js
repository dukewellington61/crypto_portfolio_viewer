import React from "react";
import { Line } from "react-chartjs-2";

const PositionRoiChartDiagram = ({ positions, marketChart, currency }) => {
  // console.log(marketChart);

  // const getData = () => {
  //   let data = [];
  //   if (marketChart.length > 0) {
  //     cumulativeValueInvestment().forEach((el) => data.push(el[1]));

  //     return data;
  //   }
  // };

  const getAmountAndDate = () => {
    let AmountAndDateArr = [];

    positions.forEach((el) => {
      let arrEl = [];

      if (el.crypto_currency === currency) {
        arrEl[0] = Date.parse(el.date_of_purchase);
        arrEl[1] = parseFloat(el.amount);
        AmountAndDateArr.push(arrEl);
      }
    });

    let sort = AmountAndDateArr.sort(function (a, b) {
      return a[0] - b[0];
    });

    for (const element in sort) {
      element > 0
        ? (sort[element][1] = sort[element][1] + sort[element - 1][1])
        : (sort[element][1] = sort[element][1]);
    }

    let uniqueElArr = [];
    sort.forEach((el, i, arr) =>
      (i < arr.length - 1 && el[0] != arr[i + 1][0]) ||
      (i > 0 && el[0] != arr[i - 1][0])
        ? uniqueElArr.push(el)
        : null
    );

    return uniqueElArr;
  };

  let marketChartCopy = JSON.parse(JSON.stringify(marketChart));

  let valueArr = [];
  let timeStampArr = [];

  const cumulativeValueInvestment = () => {
    getAmountAndDate().forEach((array1) => {
      marketChartCopy.forEach((array2, index) => {
        if (array1[0] < array2[0]) {
          valueArr[index] = array2[1] * array1[1];
          if (index % 3 === 0) {
            timeStampArr[index] = array2[2];
          } else {
            timeStampArr[index] = " ";
          }
          // counter++;
          // console.log(
          //   // counter +
          //   //   "**" +
          //   array2[2] +
          //     "**" +
          //     array2[1] * array1[1] +
          //     "**" +
          //     array2[1] +
          //     "**" +
          //     array1[1]
          // );
        }
      });
    });

    return marketChartCopy;
  };

  cumulativeValueInvestment();

  // console.log(marketChartCopy);
  // console.log(valueArr);
  // console.log(timeStampArr);

  // const getDates = () => {
  //   let timeArr = [];
  //   marketChartCopy.forEach((el) => timeArr.push(el[0]));
  //   return timeArr;
  // };

  return (
    <div>
      <Line
        data={{
          labels: timeStampArr,
          datasets: [
            {
              label: currency,
              data: valueArr,
            },
          ],
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default PositionRoiChartDiagram;

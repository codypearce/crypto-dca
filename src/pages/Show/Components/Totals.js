import React from "react";
import Total from "./Total";
import AmountInvested from "./AmountInvested";
import AmountGained from "./AmountGained";

export function round(num, digit) {
  return +(Math.round(num + "e+" + digit) + "e-" + digit);
}

export default function Totals({
  priceArr,
  freqInDays,
  amountToInvest,
  durationDisplay
}) {
  if (!priceArr) return null;
  console.log(priceArr[0][1]);
  let coinAmount = 0;
  const numOfDays = priceArr.length;
  for (let i = 0; i < numOfDays; i += Number(freqInDays)) {
    console.log(priceArr[i], i);
    const coinValue = priceArr[i][1];
    coinAmount += amountToInvest / coinValue;
  }

  const totalInvested =
    amountToInvest * Math.floor(Number(numOfDays) / Number(freqInDays));
  console.log(Number(numOfDays) / Number(freqInDays));
  const totalCoinAmount = coinAmount;
  const endTotal = totalCoinAmount * priceArr[priceArr.length - 1][1];
  const numberGained = endTotal - totalInvested;
  const percentGained = ((endTotal - totalInvested) / totalInvested) * 100;

  return (
    <div style={{ width: "100%" }}>
      <Total coinAmount={totalCoinAmount} endTotal={endTotal} />
      <AmountInvested
        totalInvested={totalInvested}
        durationDisplay={durationDisplay}
      />
      <AmountGained
        investedValue={endTotal}
        dollarAmountInvested={totalInvested}
      />
    </div>
  );
}

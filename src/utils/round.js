export function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

export function roundToFive(num) {
  return +(Math.round(num + "e+5") + "e-5");
}

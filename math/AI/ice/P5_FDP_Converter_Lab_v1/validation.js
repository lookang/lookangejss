
function validateAnswer(q, fraction, decimal, percent) {
  const correct =
    fraction === q.fraction &&
    decimal === q.decimal &&
    percent === q.percent;
  return {correct: correct};
}

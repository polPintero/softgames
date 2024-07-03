export default (): string => {
  return `rgb(${getNumber()}, ${getNumber()}, ${getNumber()})`;
};

function getNumber(): number {
  return Math.floor(Math.random() * 257);
}

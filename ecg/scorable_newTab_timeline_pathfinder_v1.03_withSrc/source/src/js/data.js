const data = await fetch("./data/data.json").then((res) => res.json());

export default async function getFactorData(id) {
  return data.find((item) => item.id === id);
}

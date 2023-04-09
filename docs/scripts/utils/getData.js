export async function getData() {
  let data = [];
  if (data.length === 0) {
    await fetch("./../../docs/data/photographers.json")
      .then((response) => response.json())
      .then((response)  => data = response);
  }
  return data
}

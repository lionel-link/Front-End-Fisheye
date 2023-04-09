export async function getData() {
  let data = [];
  if (data.length === 0) {
    await fetch("./../../docs/data/photographers.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((response) => response.json())
      .then((response)  => data = response);
  }
  return data
}

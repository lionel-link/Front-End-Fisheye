export async function getData() {
  let data = [];
  if (data.length === 0) {
    await fetch("https://github.com/lionel-link/Front-End-Fisheye/data/photographers.json")
      .then((response) => response.json())
      .then((response)  => data = response);
  }
  return data
}

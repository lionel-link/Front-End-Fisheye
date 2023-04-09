export async function getData() {
  let data = [];
  if (data.length === 0) {
    await fetch("https://github.com/lionel-link/Front-End-Fisheye/blob/ff14a0d286685399d07f9348307be5fd0524c25f/docs/data/photographers.json")
      .then((response) => response.json())
      .then((response)  => data = response);
  }
  return data
}

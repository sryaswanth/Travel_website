async function getpost() {
  return await fetch('http://localhost:3000/posts')
            .then((resp) => resp.json())
            .then((data) => data);
}
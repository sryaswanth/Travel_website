async function getpost() {
  return await fetch('/posts')
            .then((resp) => resp.json())
            .then((data) => data);
}
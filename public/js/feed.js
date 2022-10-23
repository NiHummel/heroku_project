async function createPost() {
  let content = "";
  content = document.getElementById("content").value;
  let picture = null;
  picture = document.getElementById("picture").value;

  if(content !== "") {
    // create post and refresh
    const response = await fetch('/post', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: `{"content": "${content}"${picture ? `, "picture": "${picture}"` : ""}}`,
    });
    if (!response.ok) {
      let x = await JSON.parse(await response.text());
      document.getElementById('form__group__error').innerText = x['error'];
    }
  }
}

let button = document.getElementById("button");
button.addEventListener("click", async function(event) {
  await createPost();
  const response = await fetch('/userCredentials', {
    method: 'Get',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
  });
  send(await JSON.parse(await response.text()));
  location.reload()
})
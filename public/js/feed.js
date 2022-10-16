async function createPost() {
  let content="";
  content = document.getElementById("content").value;
  let picture= null;
  picture = document.getElementById("picture").value;

  if(content !== "") {
    // create post and refresh
    const response = await fetch('http://' + location.host + '/post', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: `{
     "content": "${content}",
     ${picture ? `"picture": "${picture}",` : ""}
     "authorEmail": "deb@ya.ru"
      }`,
    });
    if (response.ok)
      location.reload()
  }
}

let button = document.querySelector(".form__group__button");
button.addEventListener("click", function (event) {
  createPost();
})

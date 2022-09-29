function randomNumber(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r).toString()
}

window.onload = async function () {
    let rand = randomNumber(1, 100);
    let url = `https://jsonplaceholder.typicode.com/posts/${rand}/comments`;
    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        getData(json);
        document.getElementById('loading').remove();
        document.getElementById('jsontable').style.display = "block";

    } else {
        alert("Ошибка HTTP: " + response.status);
    }


    function getData(json) {
        var tbody = document.querySelector("tbody");
        var template = document.querySelector('#jsontemp');
        for (var i = 0; i < json.length; i++) {
            var clone = template.content.cloneNode(true);
            var td = clone.querySelectorAll("td");
            td[0].textContent = json[i].name;
            td[1].textContent = json[i].email;
            td[2].textContent = json[i].body;
            tbody.appendChild(clone);
        }
    }
}


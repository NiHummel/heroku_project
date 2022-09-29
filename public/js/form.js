window.onload = function() {
    for(let i=0; i<localStorage.length; i++) {
        let k = 0;
        let div = document.createElement('div');
        div.innerHTML = "<div>"
        while(k < 5){
            let element = localStorage.getItem(i.toString());
            if (element == null){
                element = "";
            }
            div.innerHTML += element + " ";
            k++;
            i++;
        }
        div.innerHTML+= "</div>"
        document.getElementById("form__div").append(div);
    }
}
    function addElement() {
        let day="";
        day = document.getElementById("day").value;
        let time_lesson_start= "";
        time_lesson_start = document.getElementById("time_lesson_start").value;
        let time_lesson_end = "";
        time_lesson_end = document.getElementById("time_lesson_end").value;
        let lesson = document.getElementById("lesson").value;
        let teacher = "";
        teacher = document.getElementById("teacher").value;

        if(lesson !== "") {
            let div = document.createElement('div');
            div.innerHTML = "<div>" + day + " " + time_lesson_start + " " + time_lesson_end + " " + lesson + " " + teacher + " " + "</div>";
            document.getElementById("form__div").append(div);
            addElementInLocalStorage(day, time_lesson_start, time_lesson_end, lesson, teacher);
        }
    }
    function addElementInLocalStorage (day, time_lesson_start, time_lesson_end, lesson, teacher) {
        let cnt = 0;
        if(localStorage.length !== 0){
            cnt = parseInt(localStorage.length, 10);
        }
        localStorage.setItem(cnt.toString(), day);
        localStorage.setItem((++cnt).toString(), time_lesson_start);
        localStorage.setItem((++cnt).toString(), time_lesson_end);
        localStorage.setItem((++cnt).toString(), lesson);
        localStorage.setItem((++cnt).toString(), teacher);
    }

    let button = document.querySelector(".form__group__button");
    button.addEventListener("click", function (event) {
        addElement();
    })

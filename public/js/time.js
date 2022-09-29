var before_loadtime = new Date().getTime();
(window.onload = function (){
    var aftr_loadtime = new Date().getTime();
    pageloadtime = aftr_loadtime - before_loadtime;
    document.getElementById("min").innerHTML = pageloadtime + "ms";
})()

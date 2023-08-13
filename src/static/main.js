function celebrate() {
    document.getElementById("text-celebrate").firstElementChild.innerHTML += "<br /> Congratulations, You just celebrated!";
    $("#text-celebrate").children().eq(1).html("<b>Congratulations, You just celebrated with JQuery!</b>"); 
    setTimeout(() => {
    document.getElementById("text-celebrate").firstElementChild.innerHTML = "";
    $("#text-celebrate").children().eq(1).html(""); 
    }, 2000);
}
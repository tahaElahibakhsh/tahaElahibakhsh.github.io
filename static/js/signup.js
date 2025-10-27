document.getElementById("go-step2").addEventListener("click", function() {
    document.getElementById("signup-step1").style.display = "none";
    document.getElementById("signup-step2").style.display = "flex";
    document.getElementById("signup-step2").style.flexDirection = "column";
    document.getElementById("signup-step2").style.gap = "15px";
});

document.getElementById("back-step1").addEventListener("click", function() {
    document.getElementById("signup-step2").style.display = "none";
    document.getElementById("signup-step1").style.display = "flex";
    document.getElementById("signup-step1").style.flexDirection = "column";
    document.getElementById("signup-step1").style.gap = "15px";
});

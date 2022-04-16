function sliderScript(document) {
    slider = document.querySelector("input");
    slider.oninput = function() {
        progressBar = document.querySelector("progress");
        progressBar.value = slider.value;
        sliderValue = document.querySelector(".sliderValue");
        sliderValue.innerHTML = slider.value;
    }
}
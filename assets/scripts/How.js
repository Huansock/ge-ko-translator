const mobileBtn = document.getElementById("mobileBtn")
const desktopBtn = document.getElementById("desktopBtn")
const comSet_location = document.querySelector("#comSet").offsetTop;
const mobSet_location = document.querySelector("#mobSet").offsetTop;

desktopBtn.onclick = () => {
    window.scrollTo({
        top: comSet_location,
        behavior: 'smooth'
    });
}
mobileBtn.onclick = () => {
    window.scrollTo({
        top: mobSet_location,
        behavior: 'smooth'
    });
}
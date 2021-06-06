const backButton = document.querySelector(".back-btn");

backButton.addEventListener('click', () => {
    history.back();
})
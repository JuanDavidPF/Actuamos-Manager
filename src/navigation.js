const homeScreen = document.querySelector("#homeScreen");
const usersScreen = document.querySelector("#usersScreen");
const testScreen = document.querySelector("#testScreen");
const screen404 = document.querySelector("#screen404");
const loadingIndicator = document.querySelector("#loadingIndicator");

let currentScreen = null;

const ChangeScreen = (screen) => {
  if (currentScreen == screen) return;

  if (screen && screen.classList.contains("hidden"))
    screen.classList.remove("hidden");

  if (currentScreen && !currentScreen.classList.contains("hidden"))
    currentScreen.classList.add("hidden");

  currentScreen = screen;
}; //closes ChangeScreen method

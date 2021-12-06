//link
let baseLink = "";
let linkRoute = "";

const AnalyzeLink = () => {
  let link = window.location.href;
  if (!link.includes("#")) {
    baseLink = link + "#";
    window.location.href = baseLink;
  } else {
    let linkSegments = [];
    linkSegments = link.split("#");
    baseLink = linkSegments[0] + "#";
    linkRoute = linkSegments[1];
  }
}; //closes Analyzelink method;

const Router = () => {
  AnalyzeLink();
  currentScreen = linkRoute;
  switch (linkRoute) {
    case "":
      Redirect("/home");

      break;

    case "/home":
      break;

    case "/content":
      break;

    case "/users":
      break;
    case "/tests":
      break;

    case "/404":
      break;
    default:
      Redirect("/404");
      break;
  } //closes Router switch
}; //closes Router method

const Redirect = (path) => {
  window.location.href = baseLink + path;
}; //closes Redirect method

const Refresh = () => {
  Router();
}; //closes Redirect method

window.onhashchange = () => {
  Router();
}; //closes onHasChange event

Router();

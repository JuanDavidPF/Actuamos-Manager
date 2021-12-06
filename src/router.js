//link
let baseLink = "";
let linkRoute = "";
let projectRoute = "";

function AnalyzeLink() {
  let link = window.location.href;
  if (!link.includes("#")) {
    baseLink = link + "#";
    window.location.href = baseLink;
  } else {
    let linkSegments = [];
    linkSegments = link.split("#");
    baseLink = linkSegments[0] + "#";
    linkRoute = linkSegments[1];
    projectRoute = "";
    if (linkRoute.includes("projects")) {
      let localRoute = linkRoute.split("/");
      linkRoute = "/" + localRoute[1];
      if (localRoute[2]) projectRoute = localRoute[2];
    }
  }
} //closes Analyzelink method;

function Router() {
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
} //closes Router method

function Redirect(path) {
  window.location.href = baseLink + path;
} //closes Redirect method

function Refresh() {
  Router();
} //closes Redirect method

window.onhashchange = function () {
  Router();
}; //closes onHasChange event
Router();

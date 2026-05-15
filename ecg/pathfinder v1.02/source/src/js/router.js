import Splash from "./splash";
import Intro from "./intro";
import Header from "./header";
import Footer from "./footer";
import SettingTargets1 from "./setting-targets-1";
import SettingTargets2 from "./setting-targets-2";
import DiscoveringPurpose from "./discovering-purpose";
import ExploreMultiplePathways1 from "./explore-multiple-pathways-1";
import ExploreMultiplePathways2 from "./explore-multiple-pathways-2";
import ExploreOpportunities1 from "./explore-opportunities-1";
import ExploreOpportunities2 from "./explore-opportunities-2";
import BrainstormingNewPossibilities from "./brainstorming-new-possibilities";
import CreateMindMap from "./create-mind-map";
import ExportConclusion from "./export-conclusion";
import CreateMindMapSelector from "./create-mind-map-selector";

const navigateTo = (page) => {
  history.pushState({}, "", page);
  handleLocation();
};

const routes = {
  404: "./pages/404.html",
  "": "./pages/index.html",
  "#intro": "./pages/intro.html",
  "#setting-targets-1": "./pages/setting-targets-1.html",
  "#setting-targets-2": "./pages/setting-targets-2.html",
  "#discovering-purpose": "./pages/discovering-purpose.html",
  "#explore-multiple-pathways-1": "./pages/explore-multiple-pathways-1.html",
  "#explore-multiple-pathways-2": "./pages/explore-multiple-pathways-2.html",
  "#explore-opportunities-1": "./pages/explore-opportunities-1.html",
  "#explore-opportunities-2": "./pages/explore-opportunities-2.html",
  "#brainstorming-new-possibilities":
    "./pages/brainstorming-new-possibilities.html",
  "#create-mind-map-selector": "./pages/create-mind-map-selector.html",
  "#create-mind-map": "./pages/create-mind-map.html",
  "#export-conclusion": "./pages/export-conclusion.html",
};

const handleLocation = async () => {
  let path = location.hash;
  path = path.indexOf("?") === -1 ? path : path.substring(0, path.indexOf("?"));
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("app").innerHTML = html;

  const loadScript = (path) => {
    switch (path) {
      case "":
        Splash();
        break;
      case "#intro":
        Intro();
        break;
      case "#discovering-purpose":
        Header({
          title: "Knowing Myself - Who Am I Becoming?",
          subtitle: "",
          "redirect-option-image": "v1",
        });
        DiscoveringPurpose();
        Footer();
        break;
      case "#setting-targets-1":
        SettingTargets1();
        break;
      case "#setting-targets-2":
        SettingTargets2();
        break;

      case "#explore-opportunities-1":
        Header({
          title: "Knowing My Purpose - How can I Contribute Meaningfully?",
          "redirect-option-image": "v2",
        });
        ExploreOpportunities1();
        Footer();
        break;
      case "#explore-opportunities-2":
        Header({
          title: "Knowing My Purpose - How can I Contribute Meaningfully?",
          "redirect-option-image": "v2",
        });
        ExploreOpportunities2();
        Footer();
        break;
      case "#brainstorming-new-possibilities":
        Header({
          title: "Knowing My Purpose - How can I Contribute Meaningfully?",
          subtitle: "",
          "redirect-option-image": "v2",
        });
        BrainstormingNewPossibilities();
        break;

      case "#create-mind-map-selector":
        Header({
          title: "Knowing My Purpose - How can I Contribute Meaningfully?",
          subtitle: "",
          "redirect-option-image": "v2",
        });
        CreateMindMapSelector();
        break;
      case "#create-mind-map":
        Header({
          title: "Knowing My Purpose - How can I Contribute Meaningfully?",
          subtitle:
            "Create your career mindmap with your purpose statement. Fill the boxes with possible job roles.",
          "redirect-option-image": "v2",
        });
        CreateMindMap();
        Footer();
        break;
      case "#explore-multiple-pathways-1":
        Header({
          title: "Knowing My Goals: How Do I Take Purposeful Steps?",
          "redirect-option-image": "v3",
        });
        ExploreMultiplePathways1();
        Footer();
        break;
      case "#explore-multiple-pathways-2":
        Header({
          title: "Knowing My Goals: How Do I Take Purposeful Steps?",
          "redirect-option-image": "v3",
        });
        ExploreMultiplePathways2();
        Footer();
        break;
      case "#export-conclusion":
        ExportConclusion();
        break;
      default:
        break;
    }
  };

  loadScript(path);
};

onpopstate = handleLocation;
window.navigateTo = navigateTo;

handleLocation();

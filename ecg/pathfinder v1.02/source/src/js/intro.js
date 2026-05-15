import "../css/pages/intro.scss";
import { SessionManager } from "./session";

export default async function Intro() {
    const startBtn = document.getElementById("start-btn");

    startBtn.addEventListener("click", () => { 
        if (!SessionManager.validate()) {
            SessionManager.clear();
        } 

        navigateTo('#discovering-purpose');
    });

}

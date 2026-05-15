
import "../../css/pages/explore-opportunities-2.scss";
import handleAnswer from "../common";

export default async function ExploreOpportunities2() {
    const cards = document.querySelectorAll('.purpose-card');
    const continueBtn = document.getElementById('continueBtn');
    const backBtn = document.getElementById('backBtn');
    const errorMsg = document.getElementById('errorMsg');

    const factorId = 'explore-opportunities-1';
    handleAnswer(factorId);

    continueBtn.addEventListener('click', () => {
        navigateTo('#brainstorming-new-possibilities');
    });

}

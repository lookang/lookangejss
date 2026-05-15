import "../../css/pages/brainstorming-new-possibilities.scss";

export default async function BrainstormingNewPossibilities() {
    
    const nextBtn = document.getElementById("next-submit-btn");

    if (nextBtn) {
        nextBtn.addEventListener('click', () => { 
            navigateTo('#create-mind-map-selector');
        });
    }
}
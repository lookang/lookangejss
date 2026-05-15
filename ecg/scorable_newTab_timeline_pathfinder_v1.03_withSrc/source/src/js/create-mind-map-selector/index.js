import "../../css/pages/create-mind-map-selector.scss";
import handleAnswer, { saveAnswer } from "../common";

export default async function CreateMindMapSelector() {
  const factorId = "explore-opportunities-1";
  handleAnswer(factorId);

  const cards = document.querySelectorAll(".purpose-box");

  cards.forEach((card) => {
    card.addEventListener("click", function () { 
      const selected_purpose = this.querySelector(
        'textarea[class*="answer-"]',
      )?.value;

      if (selected_purpose) { 

        saveAnswer({
          factorId: "create-mindmap-datastore",
          key: "mindmap-selected-purpose",
          value: selected_purpose,
        });

        navigateTo("#create-mind-map");
      } else {
        console.error("Textarea value not found in the clicked card.");
      }
    });
  });
}

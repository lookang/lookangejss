import "../../css/pages/discovering-purpose.scss";
import handleAnswer from "../common";
import { getFactorId } from "../common";

export default async function DiscoveringPurpose() { 
  
  handleAnswer(getFactorId());

  const textareas = document.querySelectorAll(".answer-area");
  const validationMsg = document.getElementById("validation-msg");
  const continueBtn = document.getElementById("dp-submit-btn");
  const MAX_LENGTH = 100;
 
  const getCounter = (textarea) => {
    const counterId = `counter-${textarea.id.split("-")[1]}`;
    return document.getElementById(counterId);
  };
 
  const updateCounter = (textarea) => {
    const currentLength = textarea.value.length;
    const counter = getCounter(textarea);

    if (counter) {
      counter.textContent = `${currentLength}/${MAX_LENGTH}`;

      if (currentLength >= MAX_LENGTH) {
        counter.classList.add("limit-reached");
      } else {
        counter.classList.remove("limit-reached");
      }
    }
  };

   textareas.forEach((textarea) => {
    const counter = getCounter(textarea);

 
    textarea.addEventListener("input", (event) => {
      updateCounter(event.target);
    });
 
    textarea.addEventListener("focus", () => {
      if (counter) {
        counter.classList.add("is-focused");
      }
    });
 
    textarea.addEventListener("blur", () => {
      if (counter) {
        counter.classList.remove("is-focused");
      }
    });
 
    updateCounter(textarea);
  });

  const dropdownBtn = document.getElementById("dropdown-selector-btn");
  const dropdownMenu = document.getElementById("sectionDropdown");
 
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", (event) => {
      event.stopPropagation(); 
      dropdownMenu.classList.toggle("show");
    });
  }


  function validateAndContinue() {
    const q1 = document.querySelector(".answer-q1");
    const q2 = document.querySelector(".answer-q2");
    const q3 = document.querySelector(".answer-q3");
    const errorBanner = document.getElementById("validation-msg");

    const questions = [q1, q2, q3];
    let allValid = true;
 
    errorBanner.style.display = "none";

    questions.forEach((field) => {
      const container = field.closest(".answer-area");
      container.classList.remove("error");
      if (!field.value.trim()) {
        container.classList.add("error");
        allValid = false;
      }
    });

    if (allValid) { 
      navigateTo("#setting-targets-1");
    } else { 
      errorBanner.style.display = "block";
    }
  }
 
  const allTextAreas = document.querySelectorAll("textarea");
  allTextAreas.forEach((area) => {
    area.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.closest(".question-card").classList.remove("error");
 
        const q1 = document.querySelector(".answer-q1").value.trim();
        const q2 = document.querySelector(".answer-q2").value.trim();
        const q3 = document.querySelector(".answer-q3").value.trim();
        if (q1 && q2 && q3) {
          document.getElementById("validation-msg").classList.remove("visible");
        }
      }
    });
  });

  const btn = document.getElementById("dp-submit-btn");
  if (btn) {
    btn.addEventListener("click", validateAndContinue);
  } else {
    console.error("Button #dp-submit-btn not found in DOM");
  }
}

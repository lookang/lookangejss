import "../../css/pages/explore-opportunities-1.scss";
import handleAnswer from "../common";
import { getFactorId } from "../common";

export default async function ExploreOpportunities1() {
  handleAnswer(getFactorId());

  const draggables = document.querySelectorAll(".option-btn");
  const dropZones = document.querySelectorAll(".drop-zone");
  const textareas = document.querySelectorAll(".drop-zone textarea");
  const continueBtn = document.getElementById("continue-btn");
  const errorDisplay = document.getElementById("error-display");
  const dropZonesContainer = document.getElementById("drop-zones-container");

  function dispatchChangeEvent(element) {
    const event = new Event("change", { bubbles: true });
    element.dispatchEvent(event);
  }

  function hideOption(id) {
    const option = document.getElementById(id);
    if (option) {
      option.classList.add("hidden");
    }
  }

  function showOption(id) {
    const option = document.getElementById(id);
    if (option) {
      option.classList.remove("hidden");
    }
  }

  function clearZone(textarea, zone, dispatchChange = true) {
    const existingId = textarea.getAttribute("data-option-id");
    if (existingId) {
      showOption(existingId);
    }
    textarea.value = "";
    textarea.setAttribute("data-option-id", "");
    zone.classList.remove("filled", "error");
    if (dispatchChange) {
      dispatchChangeEvent(textarea);
    }
    validateRealTime();
  }

  function initializeSelections() {
    const allDraggableItems = Array.from(draggables);
    const itemList = allDraggableItems.map(div => [div.id, div.textContent.trim()]);

    textareas.forEach((textarea) => {
      const zone = textarea.closest(".drop-zone");
      const value = textarea.value.trim();
      let optionId = textarea.getAttribute("data-option-id");

      if (value !== "") {
        if (!optionId) {
          const matchedItem = itemList.find(item => item[1] === value);
          if (matchedItem) {
            optionId = matchedItem[0];
            textarea.setAttribute("data-option-id", optionId);
          }
        }
        if (optionId) {
          hideOption(optionId);
        }
        zone.classList.add("filled");
      } else {
        zone.classList.remove("filled");
      }
    });
    validateRealTime();
  }

  initializeSelections();

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      draggable.classList.add("dragging");
      e.dataTransfer.setData("text/plain", draggable.innerText);
      e.dataTransfer.setData("application/option-id", draggable.id);
      e.dataTransfer.effectAllowed = "copy";
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  dropZones.forEach((zone) => {
    const textarea = zone.querySelector("textarea");
    const clearButton = zone.querySelector(".clear-btn");

    clearButton.addEventListener("click", () => {
      clearZone(textarea, zone);
    });

    textarea.addEventListener("input", () => {
      const val = textarea.value.trim();
      if (val !== "") {
        zone.classList.add("filled");
        zone.classList.remove("error");
        const existingId = textarea.getAttribute("data-option-id");
        if (existingId) {
          const option = document.getElementById(existingId);
          if (option && option.innerText !== val) {
            showOption(existingId);
            textarea.setAttribute("data-option-id", "");
          }
        }
      } else {
        clearZone(textarea, zone, false);
      }
      validateRealTime();
    });

    textarea.addEventListener("change", () => {
      validateRealTime();
    });

    textarea.addEventListener("dragstart", (e) => {
      if (textarea.value.trim() !== "") {
        e.dataTransfer.setData("application/zone-id", zone.id);
        e.dataTransfer.setData("application/option-id-restore", textarea.getAttribute("data-option-id"));
        e.dataTransfer.effectAllowed = "move";
        textarea.classList.add("dragging");
      } else {
        e.preventDefault();
      }
    });

    textarea.addEventListener("dragend", () => {
      textarea.classList.remove("dragging");
    });

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-over");

      const textData = e.dataTransfer.getData("text/plain");
      const optionId = e.dataTransfer.getData("application/option-id");

      if (textData && optionId) {
        clearZone(textarea, zone, false);
        textarea.value = textData;
        textarea.setAttribute("data-option-id", optionId);
        hideOption(optionId);
        zone.classList.add("filled");
        zone.classList.remove("error");
        dispatchChangeEvent(textarea);
      }
    });
  });

  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("drop", (e) => {
    const sourceZoneId = e.dataTransfer.getData("application/zone-id");
    const restoreOptionId = e.dataTransfer.getData("application/option-id-restore");

    if (sourceZoneId) {
      const targetElement = e.target;
      if (!dropZonesContainer.contains(targetElement)) {
        const sourceZone = document.getElementById(sourceZoneId);
        const sourceTextarea = sourceZone ? sourceZone.querySelector("textarea") : null;
        if (sourceTextarea) {
          clearZone(sourceTextarea, sourceZone);
          if (restoreOptionId) {
            showOption(restoreOptionId);
          }
        }
      }
    }
  });

  function validateRealTime() {
    const anyFilled = Array.from(textareas).some(textarea => textarea.value.trim() !== "");
    if (anyFilled) {
      errorDisplay.style.opacity = "0";
    }
  }

  continueBtn.addEventListener("click", () => {
    let filledCount = 0;
    textareas.forEach((textarea) => {
      if (textarea.value.trim() !== "") {
        filledCount++;
        textarea.closest(".drop-zone").classList.remove("error");
      }
    });

    if (filledCount > 0) {
      navigateTo("#explore-opportunities-2");
    } else {
      errorDisplay.style.opacity = "1";
      textareas.forEach((textarea) => {
        if (textarea.value.trim() === "") {
          textarea.closest(".drop-zone").classList.add("error");
        }
      });
    }
  });
}
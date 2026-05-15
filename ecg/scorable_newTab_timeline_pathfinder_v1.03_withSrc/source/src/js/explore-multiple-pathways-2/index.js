import "../../css/pages/explore-multiple-pathways-2.scss";
import handleAnswer from "../common";
import { getFactorId } from "../common";

export default async function ExploreMultiplePathways2() {
    handleAnswer(getFactorId());
    const continueBtn = document.getElementById('continue-btn');
    const errorDiv = document.getElementById('validation-error');
    const allTextareas = document.querySelectorAll('textarea[class^="answer-"]');

    const MAX_LENGTH = 300;

    const getCounter = (textarea) => {
        return textarea.nextElementSibling;
    };

    const updateCounter = (textarea) => {
        const currentLength = textarea.value.length;
        const counter = getCounter(textarea);

        if (counter) {
            counter.textContent = `${currentLength}/${MAX_LENGTH}`;

            if (currentLength >= MAX_LENGTH) {
                counter.classList.add('limit-reached');
            } else {
                counter.classList.remove('limit-reached');
            }
        }
    };

    allTextareas.forEach(textarea => {
        const counter = getCounter(textarea);

        textarea.addEventListener('input', (event) => {
            updateCounter(event.target);
        });

        textarea.addEventListener('focus', () => {
            if (counter) {
                counter.classList.add('is-focused');
            }
        });

        textarea.addEventListener('blur', () => {
            if (counter) {
                counter.classList.remove('is-focused');
            }
        });

        updateCounter(textarea);
    });


    continueBtn.addEventListener('click', () => {
        let allFilled = true;
        allTextareas.forEach(ta => {
            if (ta.value.trim() === "") {
                ta.classList.add('error');
                allFilled = false;
            } else {
                ta.classList.remove('error');
            }
        });

        if (!allFilled) {
            errorDiv.style.display = 'block';
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            errorDiv.style.display = 'none';
            navigateTo('#export-conclusion');
        }
    });

    allTextareas.forEach(ta => {
        ta.addEventListener('input', () => {
            const counter = document.getElementById(ta.id.replace('answer-', 'counter-'));
            if (counter) counter.textContent = `${ta.value.length}/200`;
            if (ta.value.trim() !== "") ta.classList.remove('error');
        });
    });



}

import "../../css/pages/explore-multiple-pathways-1.scss";
import handleAnswer from "../common";
import { getFactorId } from "../common";

export default async function ExploreMultiplePathways1() {
    handleAnswer(getFactorId());
    const textareas = document.querySelectorAll('.input-container textarea');
    const MAX_LENGTH = 200; 

    const getCounter = (textarea) => {
        const counterId = `counter-${textarea.id.split('-')[1]}`;
        return document.getElementById(counterId);
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

    textareas.forEach(textarea => {
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


    function toggleTip(btn) { 
        const row = btn.closest('.input-row'); 
        const tipBox = row.querySelector('.example-box');
 
        if (tipBox.style.display === 'flex') {
            tipBox.style.display = 'none';
        } else {
            tipBox.style.display = 'flex';
        }
    }
 
    function closeTip(closeBtn) {
        const tipBox = closeBtn.closest('.example-box');
        tipBox.style.display = 'none';
    }
  
    document.querySelectorAll('.tips-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            toggleTip(this);
        });
        
        btn.addEventListener('blur', (e) => {
            document.querySelectorAll('.example-box').forEach(box => {
                box.style.display = 'none';
            });
        });        
    });
 
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function (e) { 
            e.stopPropagation();
            closeTip(this);
        });
    });


    const continueBtn = document.getElementById('continue-btn');
    const errorDiv = document.getElementById('validation-error'); 
    const allTextareas = document.querySelectorAll('textarea[class^="answer-"]');
 
    continueBtn.addEventListener('click', () => {
        let allFilled = true;

        allTextareas.forEach(textarea => {
            if (textarea.value.trim() === "") {
                textarea.classList.add('error');
                allFilled = false;
            } else {
                textarea.classList.remove('error');
            }
        });

        if (!allFilled) {
            errorDiv.style.display = 'block'; 
            const firstEmpty = Array.from(allTextareas).find(ta => ta.value.trim() === "");
            if (firstEmpty) firstEmpty.focus();
 
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            errorDiv.style.display = 'none'; 
            navigateTo('#explore-multiple-pathways-2');
        }
    });
 
    allTextareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
            if (textarea.value.trim() !== "") {
                textarea.classList.remove('error');
 
                const stillEmpty = Array.from(allTextareas).some(ta => ta.value.trim() === "");
                if (!stillEmpty) {
                    errorDiv.style.display = 'none';
                }
            }
        });
    });
}

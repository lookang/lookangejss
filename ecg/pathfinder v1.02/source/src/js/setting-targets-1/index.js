import "../../css/pages/setting-targets-1.scss";
import handleAnswer from "../common";
import { getFactorId } from "../common";

export default async function SettingTargets1() {
    handleAnswer(getFactorId());
    const textareas = document.querySelectorAll('.input-container textarea');
    const validationMsg = document.getElementById('validation-msg');
    const continueBtn = document.getElementById('dp-submit-btn');

    const MAX_LENGTH = 200;

    const getCounter = (textarea) => {
        return textarea.closest('.textarea-wrapper').querySelector('.char-counter');
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
                counter.classList.add('visible');
            }
        });

        textarea.addEventListener('blur', () => {
            if (counter) {
                counter.classList.remove('visible');
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

    const submitBtn = document.getElementById('dp-submit-btn');

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {

            const textareas = document.querySelectorAll('textarea');
            let allFilled = true;

            if (!allFilled) {
                validationMsg.classList.add('visible');
            } else {
                validationMsg.classList.remove('visible');
            }
        });
    }

    function validateAndContinue() {
        const q1 = document.querySelector('.answer-q1');
        const q2 = document.querySelector('.answer-q2');
        const q3 = document.querySelector('.answer-q3');
        const errorMsg = document.getElementById('validation-msg');

        let isValid = true;

        const checkField = (field) => {
            const container = field.closest('.input-container');
            if (!field.value.trim()) {
                container.classList.add('error');
                return false;
            } else {
                container.classList.remove('error');
                return true;
            }
        };

        const v1 = checkField(q1);
        const v2 = checkField(q2);
        const v3 = checkField(q3);

        if (v1 && v2 && v3) {
            errorMsg.classList.remove('visible');
            navigateTo('#setting-targets-2');
        } else {
            errorMsg.classList.add('visible');
        }
    }

    const allTextAreas = document.querySelectorAll('textarea');
    allTextAreas.forEach(area => {
        area.addEventListener('input', function () {
            if (this.value.trim() !== "") {
                this.closest('.input-container').classList.remove('error');

                const q1 = document.querySelector('.answer-q1').value.trim();
                const q2 = document.querySelector('.answer-q2').value.trim();
                const q3 = document.querySelector('.answer-q3').value.trim();
                if (q1 && q2 && q3) {
                    document.getElementById('validation-msg').classList.remove('visible');
                }
            }
        });
    });

    const btn = document.getElementById('dp-submit-btn');
    if (btn) {
        btn.addEventListener('click', validateAndContinue);
    } else {
        console.error("Button #dp-submit-btn not found in DOM");
    }
}

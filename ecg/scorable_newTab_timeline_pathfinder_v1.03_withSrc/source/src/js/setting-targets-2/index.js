import "../../css/pages/setting-targets-2.scss";
import handleAnswer from "../common";
import { getFactorId } from "../common";

export default async function SettingTargets2() {
    handleAnswer(getFactorId());

    const textarea = document.getElementById('strength-answer');
    const counter = document.getElementById('counter-strength');
    const tipsBtn = document.getElementById('tips-btn');
    const exampleBox = document.querySelector('.example-box');
    const closeBtn = document.querySelector('.close-btn');
    const container = document.getElementById("input-container");
    const continueBtn = document.getElementById("continue-btn");

    const MAX_LENGTH = 300;

    const updateCounter = () => {
        const currentLength = textarea.value.length;

        if (counter) {
            counter.textContent = `${currentLength}/${MAX_LENGTH}`;

            if (currentLength >= MAX_LENGTH) {
                counter.classList.add('limit-reached');
            } else {
                counter.classList.remove('limit-reached');
            }
        }
    };

    textarea.addEventListener('input', updateCounter);

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

    updateCounter();

    function toggleTip(btn) {
        const wrapper = btn.closest('.input-wrapper');
        const tipBox = wrapper.querySelector('.example-box');

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


    continueBtn.addEventListener("click", () => {
        const textValue = textarea.value.trim();

        if (textValue.length === 0) {
            container.classList.add("error");
            textarea.focus();
        } else {
            navigateTo("#explore-opportunities-1");
        }
    });


}

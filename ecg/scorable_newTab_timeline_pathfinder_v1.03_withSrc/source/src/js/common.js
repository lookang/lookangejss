export const saveAnswer = ({ factorId, key, value }) => {
  let data = localStorage.getItem(factorId);
  console.log(value);
  data = {
    ...JSON.parse(data),
    [key]: value,
  };

  localStorage.setItem(factorId, JSON.stringify(data));

  const now = new Date();

  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  localStorage.setItem('form-information', JSON.stringify({ 'completion-date': now }));
};

export const loadAnswer = ({ factorId, key }) => {
  const data = localStorage.getItem(factorId);
  return (data && JSON.parse(data)[key]) || "";
};

export default function handleAnswer(factorId) {
  const answers = document.querySelectorAll("[class*=answer-]");

  answers.forEach((answer) => {
    answer.value = loadAnswer({ factorId, key: answer.className });

    answer.onchange = (e) => {
      const {
        target: { className: key, value },
      } = e;

      saveAnswer({
        factorId,
        key,
        value,
      });
    };
  });
}

export const getFactorId = () => {
  const url = new URL(location.href);
  const routeName = url.hash.slice(1);

  return routeName;
};

export const generateExportData = async () => {
  const factorIds = [
    "discovering-purpose",
    "setting-targets-1",
    "setting-targets-2",
    "explore-opportunities-1",
    "explore-opportunities-2",
    "brainstorming-new-possibilities",
    "create-mind-map",
    "explore-multiple-pathways-1",
    "explore-multiple-pathways-2",
  ];


  let completionDate = new Date(loadAnswer({ factorId: 'form-information', key: 'completion-date' }));


  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = completionDate.toLocaleDateString('en-GB', options);
  const elements = document.querySelectorAll('.completion-date');

  elements.forEach(element => {
    element.innerHTML = `Completed on ${formattedDate}`;
  });


  await factorIds.forEach(async (factorId, i) => {

    const answer = JSON.parse(localStorage.getItem(factorId));
    if (!answer) return;
    Object.entries(answer).forEach(([key, value]) => {

      const targetDiv = document.getElementById(`${factorId}-${key}`);

      if (targetDiv) {
        targetDiv.textContent = value;
      }

    });
  });
};



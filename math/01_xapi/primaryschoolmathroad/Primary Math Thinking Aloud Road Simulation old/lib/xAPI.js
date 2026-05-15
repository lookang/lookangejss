// Using a namespace to prevent global variable clashes
const XAPIUtils = {
  parameters: null, // Parameters store
  getParameters: function () {
    if (!this.parameters) { // Ensure fetch once
      var urlParams = new URLSearchParams(window.location.search);
      var endpoint = urlParams.get('endpoint');
      var auth = urlParams.get('auth');
      var agent = JSON.parse(urlParams.get('agent'));
      var stateId = urlParams.get('stateId');
      var activityId = urlParams.get('activityId');

      document.querySelector("#cookieId").innerText = "Cookie: " + auth;
      document.querySelector("#questionId").innerText = "Question ID: " + activityId;
      document.querySelector("#userId").innerText = "User ID: " + stateId;

      ADL.XAPIWrapper.changeConfig({
        "endpoint": endpoint + "/",
        "auth": `Basic ${auth}`
      });
      this.parameters = {
        agent,
        stateId,
        activityId
      };
    }

    return this.parameters;
  }
};

// Immediately invoke getParameters on page load
document.addEventListener("DOMContentLoaded", function () {
  XAPIUtils.getParameters(); // Fetch parameters once on load
});

async function storeState(stateValue) {
  try {
    const parameters = XAPIUtils.getParameters(); // Retrieve parameters from store
    const activityId = parameters.activityId;
    const stateId = parameters.stateId;
    const agent = parameters.agent;
    const registration = null;

    ADL.XAPIWrapper.sendState(activityId, agent, stateId, registration, stateValue);
    document.querySelector("#result").innerText = "Submitted: " + JSON.stringify(stateValue, null, 2);
  } catch (err) {
    console.error("An error has occurred!", err);
    document.querySelector("#result").innerText = "Error has occurred: " + err;
  }
}

function getState() {
  try {
    const parameters = XAPIUtils.getParameters(); // Retrieve parameters from store
    const activityId = parameters.activityId;
    const stateId = parameters.stateId;
    const agent = parameters.agent;

    const result = ADL.XAPIWrapper.getState(activityId, agent, stateId);
    document.querySelector("#getState").innerText = "First Load State: " + JSON.stringify(result, null, 2);
    return result;
  } catch (err) {
    console.error("An error has occurred!", err);
    document.querySelector("#getState").innerText = "Error has occurred: " + err;
  }
}
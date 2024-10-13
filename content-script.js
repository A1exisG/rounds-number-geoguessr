function addRoundSelect() {
  const newDiv = document.createElement("div");

  const htmlElement = `<div class="game-options_optionLabel__Vk5xN" style="margin-bottom: 14px">${
    isFrenchURL() ? "Nombre de rounds" : "Round number"
  }</div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      "
    >
      <button
        class="button_link__LWagc button_variantSecondary__hvM_F button_sizeSmall__MB_qj"
        id="decrementRoundNumber"
      >
        -
      </button>
      <div id="roundNumber" style="width: 20px; text-align: center"></div>
      <button
        class="button_link__LWagc button_variantSecondary__hvM_F button_sizeSmall__MB_qj"
        id="incrementRoundNumber"
      >
        +
      </button>
    </div>`;

  newDiv.style.marginRight = "30px";
  newDiv.innerHTML = htmlElement;

  const divSettings = document.querySelector(
    "div.game-options_options__u5S1_ > div:nth-child(1)"
  );

  if (divSettings) {
    const divSettingsParent = divSettings.parentNode;
    divSettingsParent.insertBefore(newDiv, divSettings);

    setupEventListeners();
  }
}

function isFrenchURL() {
  const currentUrl = window.location.href;
  return currentUrl.includes("/fr/");
}

function setupEventListeners() {
  const roundNumber = document.getElementById("roundNumber");

  const roundNumberLocal = JSON.parse(
    localStorage.getItem("game-settings")
  ) || { rounds: 5 };

  roundNumber.innerHTML = roundNumberLocal.rounds;

  document
    .querySelector("#incrementRoundNumber")
    .addEventListener("click", () => {
      let currentValue = Number(roundNumber.innerHTML);
      let newValue = Math.min(currentValue + 1, 5);
      if (newValue !== currentValue) {
        roundNumber.innerHTML = newValue;
        roundNumberLocal.rounds = newValue;
        localStorage.setItem("game-settings", JSON.stringify(roundNumberLocal));
        window.location.reload();
      }
    });

  document
    .querySelector("#decrementRoundNumber")
    .addEventListener("click", () => {
      let currentValue = Number(roundNumber.innerHTML);
      let newValue = Math.max(currentValue - 1, 1);
      if (newValue !== currentValue) {
        roundNumber.innerHTML = newValue;
        roundNumberLocal.rounds = newValue;
        localStorage.setItem("game-settings", JSON.stringify(roundNumberLocal));
        window.location.reload();
      }
    });
}

function observeDomChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const settingsDiv = document.querySelector(
          "div.game-options_options__u5S1_ > div:nth-child(1)"
        );
        if (settingsDiv && !document.querySelector("#roundNumber")) {
          addRoundSelect();
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

observeDomChanges();

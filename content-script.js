function addRoundSelect() {
    const newDiv = document.createElement('div')

    const htmlElement = `<div class="game-options_optionLabel__Vk5xN" style="margin-bottom: 14px">Nombre de rounds</div>
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
    </div>`

    newDiv.style.marginRight = "30px"
    newDiv.innerHTML = htmlElement

    const divSettings = document.querySelector("div.game-options_options__u5S1_ > div:nth-child(1)")

    if (divSettings) {
        const divSettingsParent = divSettings.parentNode
        divSettingsParent.insertBefore(newDiv, divSettings)

        setupEventListeners()
    }
}

function setupEventListeners() {
    const roundNumber = document.getElementById("roundNumber")

    const roundNumberLocal = JSON.parse(localStorage.getItem("game-settings"))

    roundNumber.innerHTML = JSON.stringify(roundNumberLocal?.rounds || 1)

    document.querySelector("#incrementRoundNumber").addEventListener("click", () => {
        let currentValue = Number(roundNumber.innerHTML)
        let newValue = currentValue + 1
        roundNumber.innerHTML = newValue > 5 ? 5 : newValue
        roundNumberLocal.rounds = newValue > 5 ? 5 : newValue
        localStorage.setItem("game-settings", JSON.stringify(roundNumberLocal))
        window.location.reload()
    })

    document.querySelector("#decrementRoundNumber").addEventListener("click", () => {
        let currentValue = Number(roundNumber.innerHTML)
        let newValue = currentValue - 1
        roundNumber.innerHTML = newValue < 1 ? 1 : newValue
        roundNumberLocal.rounds = newValue < 1 ? 1 : newValue
        localStorage.setItem("game-settings", JSON.stringify(roundNumberLocal))
        window.location.reload()
    })
}

function observeDomChanges() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const settingsDiv = document.querySelector("div.game-options_options__u5S1_ > div:nth-child(1)")
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

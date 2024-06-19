"use strict";

// GAME RULES MODAL

const rulesBtn = document.querySelector(".btn-rules");
const rulesModal = document.querySelector(".game-rules");
const overlay = document.querySelector(".overlay");
const rulesCloseBtn = document.querySelector(".rules-close");

const openRules = function () {
  rulesModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeRules = function () {
  rulesModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

rulesBtn.addEventListener("click", openRules);

rulesCloseBtn.addEventListener("click", closeRules);

overlay.addEventListener("click", closeRules);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!rulesModal.classList.contains("hidden")) {
      closeRules();
    }
  }
});

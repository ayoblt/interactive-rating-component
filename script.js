"use strict";

// TODO:
// USER HOVERS ON RATE BTNS AND BTN + PREVIOUS RATE BTN NUMBER GET HIGHLIGHTED
// USER CLICKS: CARDS ARE SWITCHED AND RATE NUMBER DISPLAYED

const card = document.querySelector(".card");
const ratingContainer = document.querySelector(".rating-header");
const btnRatingContainer = document.querySelector(".btn-rating-container");
const btnRatings = document.querySelectorAll(".btn-rating");
const btnSubmit = document.querySelector(".btn-submit");
const cardImg = document.querySelector(".card-image");
const ratingTitle = document.querySelector(".rating-title");
const ratingText = document.querySelector(".rating-text");
const ratingMsg = document.querySelector(".rating-msg");
const btnClearRating = document.querySelector(".clear-rating");

const initials = function () {
  card.classList.remove("thank-you");
  cardImg.src = "images/icon-star.svg";
  cardImg.classList.add("icon");
  cardImg.classList.remove("thank-you-icon");
  btnRatingContainer.style.display = "flex";
  ratingTitle.innerHTML = "How did we do?";
  ratingMsg.style.display = "none";
  ratingText.innerHTML = `Please let us know how we did with your support request. All
  feedback is appreciated to help us improve our offering!`;

  btnSubmit.style.display = "inline-block";
  btnSubmit.classList.remove("enable");
  btnClearRating.style.display = "none";
};

const handleHover = function (e) {
  if (e.target.classList.contains("btn-rating")) {
    const currentBtn = e.target;
    const siblings = currentBtn
      .closest(".btn-rating-container")
      .querySelectorAll(".btn-rating");
    if (e.type === "click") {
      btnRatingContainer.classList.add("clicked");
      btnSubmit.classList.add("enable");
      currentBtn.classList.add("btn-hover");
      rating = currentBtn.dataset.rating;
      siblings.forEach((el) => {
        if (el !== currentBtn) {
          if (currentBtn.dataset.rating > el.dataset.rating) {
            el.classList.add("btn-hover");
          } else {
            el.classList.remove("btn-hover");
          }
        }
      });
    }

    if (!btnRatingContainer.classList.contains("clicked")) {
      if (currentBtn.classList.contains("btn-hover")) {
        currentBtn.classList.remove("btn-hover");
        siblings.forEach((el) => {
          el.classList.remove("btn-hover");
        });
      } else {
        currentBtn.classList.add("btn-hover");
        siblings.forEach((el) => {
          if (el.dataset.rating < currentBtn.dataset.rating) {
            el.classList.add("btn-hover");
          }
        });
      }
    }
  }
};

const flipCard = function (rating = false) {
  if (rating) {
    card.classList.add("thank-you");
    cardImg.src = "images/illustration-thank-you.svg";
    cardImg.classList.remove("icon");
    cardImg.classList.add("thank-you-icon");
    btnRatingContainer.style.display = "none";
    btnRatingContainer.classList.remove("clicked");
    btnRatings.forEach((el) => {
      el.classList.remove("btn-hover");
    });
    ratingTitle.innerHTML = "Thank you!";
    ratingMsg.style.display = "block";
    ratingMsg.innerHTML = `You selected ${rating} out of 5`;
    ratingText.innerHTML = `We appreciate you taking the time to give a rating. If you ever need
    more support, don’t hesitate to get in touch!`;

    btnSubmit.style.display = "none";
    btnClearRating.style.display = "inline-block";
  } else {
    initials();
  }
};

const btnListeners = function () {
  btnRatingContainer.addEventListener("mouseover", handleHover);
  btnRatingContainer.addEventListener("mouseout", handleHover);
  btnRatingContainer.addEventListener("click", handleHover);

  btnSubmit.addEventListener("click", function () {
    if (btnRatingContainer.classList.contains("clicked")) {
      flipCard(rating);
      saveToMemory(rating);
      btnClearRating.style.display = "inline-block";
    }
  });
};

const saveToMemory = function (rating) {
  localStorage.setItem("rated", true);
  localStorage.setItem("rating", rating);
};

let keysPressed = {};
const clearMemory = function () {
  document.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;
    if (keysPressed["control"] && e.key === "escape") {
      localStorage.clear();
    }
  });

  document.addEventListener("keyup", (e) => {
    delete keysPressed[e.key];
  });
};

let rating;

const init = function () {
  if (localStorage.getItem("rated") === "true") {
    rating = localStorage.getItem("rating");
    flipCard(rating);
  } else {
    btnListeners(rating);
    flipCard();
  }
};
btnClearRating.addEventListener("click", function () {
  localStorage.clear();
  init.call(this);
});
init();

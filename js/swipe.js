const DECISION_THRESHOLD = 100
let isAnimating = false
let pullDeltaX = 0

// Global variables
let femaleModels = []; // Array to store female models
let maleModels = [];   // Array to store male models
let minModelsCount = 10; // Counter for loaded models
let gender = ''; // Global variable to store the selected gender


function checkModelUrls() {
  let modelCard = document.querySelectorAll('.swipe-model')[0]
  let likeBtn = document.querySelector('.model-option.like')
  let likeOfBtn = document.querySelector('.model-option.like-of')
  let profileBtn = document.querySelector('.model-option.profile')

  if (modelCard) {
    let featuredCardUrl = modelCard.dataset.url;
    let profileCardUrl = modelCard.dataset.profile;

    if (modelCard.classList.contains('featured') && featuredCardUrl) {
      likeOfBtn.style.display = 'flex'
      likeOfBtn.setAttribute('href', featuredCardUrl)
    } else {
      likeOfBtn.style.display = 'none'
      likeOfBtn.setAttribute('href', '#')
    }

    if (profileCardUrl) {
      profileBtn.setAttribute('href', profileCardUrl)
    } else {
      profileBtn.removeAttribute('href')
    }

  } else {
    likeBtn.removeAttribute('href')
    likeOfBtn.removeAttribute('href')
    profileBtn.removeAttribute('href')
  }

}
document.addEventListener('DOMContentLoaded', checkModelUrls)

function startDrag(event) {
  let likeBtn = document.querySelector('.model-option.like')
  let likeOfBtn = document.querySelector('.model-option.like-of')
  let passBtn = document.querySelector('.model-option.pass')
  let profileBtn = document.querySelector('.model-option.profile')

  if (isAnimating) return

  const actualCard = event.target.closest('.swipe-model')
  if (!actualCard) return

  let nextCardElement = actualCard.nextElementSibling;

  const startX = event.pageX ?? event.touches[0].pageX

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)

  document.addEventListener('touchmove', onMove, { passive: true })
  document.addEventListener('touchend', onEnd, { passive: true })

  function checkNextCard() {

    if (nextCardElement) {
      let featuredCardUrl = nextCardElement.dataset.url;
      let profileCardUrl = nextCardElement.dataset.profile;

      if (nextCardElement.classList.contains('featured') && featuredCardUrl) {
        likeOfBtn.style.display = 'flex'
        likeOfBtn.setAttribute('href', featuredCardUrl)
      } else {
        likeOfBtn.style.display = 'none'
        likeOfBtn.setAttribute('href', '#')
      }

      if (profileCardUrl) {
        profileBtn.setAttribute('href', profileCardUrl)
      } else {
        profileBtn.removeAttribute('href')
      }

    } else {
      likeBtn.removeAttribute('href')
      likeOfBtn.removeAttribute('href')
      profileBtn.removeAttribute('href')
    }

  }

  function openActualFeaturedUrl() {
    if (actualCard.classList.contains('featured')) {
      let featuredCardUrl = actualCard.dataset.url;
      if (featuredCardUrl) {
        window.open(featuredCardUrl);
      }
    }
  }

  function onMove(event) {
    const currentX = event.pageX ?? event.touches[0].pageX

    pullDeltaX = currentX - startX

    if (pullDeltaX === 0) return

    isAnimating = true

    const deg = pullDeltaX / 14

    actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`

    actualCard.style.cursor = 'grabbing'

    const opacity = Math.abs(pullDeltaX) / 100
    const goLike = pullDeltaX > 0
    let scale = opacity + 1;

    if (scale < 1) {
      scale = 1;
    } else if (scale > 1.05) {
      scale = 1.05;
    }

    const buttonScaleEl = goLike
      ? document.querySelector('.model-option.like')
      : document.querySelector('.model-option.pass')

    buttonScaleEl.style.transform = 'scale(' + scale + ')';

    const choiceEl = goLike
      ? actualCard.querySelector('.choice.like')
      : actualCard.querySelector('.choice.nope')

    choiceEl.style.opacity = opacity
  }

  function onEnd(event) {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)

    document.removeEventListener('touchmove', onMove)
    document.removeEventListener('touchend', onEnd)

    const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

    if (decisionMade) {
      const goLike = pullDeltaX >= 0

      checkNextCard();

      if (goLike) {
        // Logica cuando se da Like
        openActualFeaturedUrl();
      } else {
        // Logica cuando se da Pass
      }

      actualCard.classList.add(goLike ? 'go-right' : 'go-left')
      actualCard.addEventListener('transitionend', () => {
        actualCard.remove();
        renderModels(); // Render new models using the global gender variable
      })
    } else {
      actualCard.classList.add('reset')
      actualCard.classList.remove('go-right', 'go-left')

      document.querySelectorAll('.model-option').forEach(choice => {
        choice.style.transform = 'scale(' + 1 + ')';
      })
      actualCard.querySelectorAll('.choice').forEach(choice => {
        choice.style.opacity = 0
      })
    }

    actualCard.addEventListener('transitionend', () => {
      actualCard.removeAttribute('style')
      actualCard.classList.remove('reset')

      pullDeltaX = 0
      isAnimating = false
    })

    document
      .querySelectorAll(".model-option")
      .forEach((el) => (el.style.transform = 'scale(' + 1 + ')'));

    actualCard
      .querySelectorAll(".choice")
      .forEach((el) => (el.style.opacity = 0));

  }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })

// Tiempo de espera para pasar de card haciendo click en los botones
let swipeDelay = 500;
const optionsWrapper = document.querySelector('.model-options-wrapper')

function swipeOnClick(ms) {
  let firstModelCard = document.querySelectorAll('.swipe-model')[0]
  firstModelCard.style.transition = '.5s'
  optionsWrapper.classList.add('load')
  setTimeout(() => {
    firstModelCard.style.transform = 'scale(0)'
    firstModelCard.style.opacity = '0'
  }, ms);

  setTimeout(() => {
    firstModelCard.remove();
    checkModelUrls();
    optionsWrapper.classList.remove('load')
  }, ms + 200);
}

optionsWrapper.addEventListener('click', (e) => {
  let target = e.target;
  let firstModelCard = document.querySelectorAll('.swipe-model')[0]
  if (firstModelCard) {
    let like = firstModelCard.querySelector('.choice.like')
    let nop = firstModelCard.querySelector('.choice.nope')

    if (target.classList.contains('pass')) {
      nop.style.opacity = '1'
      swipeOnClick(swipeDelay)
    }

    if (target.classList.contains('like')) {
      like.style.opacity = '1'
      swipeOnClick(swipeDelay)
    }

    if (target.classList.contains('like-of')) {
      like.style.opacity = '1'
      swipeOnClick(swipeDelay)
    }
  }
})

// Function to render models in the container
function renderModels() {
  const models = gender === 'female' ? femaleModels : maleModels; // Use the global gender variable
  const container = document.getElementById('model-cards-container');

  // Ensure there are always 3 models in the container
  while (container.children.length < 3) {
    if (models.length < minModelsCount) {
      fetchMoreModels(gender); // Fetch more models if needed
      return; // Exit if we are fetching more models
    }

    const model = models.shift(); // Get and remove the first element of the array
    if (!model) break; // Exit if there are no more models

    // Create a new model card
    const modelCard = document.createElement('div');
    modelCard.classList.add('swipe-model');
    if (model.feature) modelCard.classList.add('featured');

    modelCard.setAttribute('data-profile', model.url);
    modelCard.setAttribute('data-url', model.url_of);

    // Build the content of the card
    modelCard.innerHTML = `
            <div class="swipe-model-card">
                <div class="swipe-model-picture">
                    <img src="${model.imageUrl}" alt="${model.name}" />
                </div>
                <div class="swipe-model-content">
                    <div class="model-info">
                    <p class="model-name">${model.name}</p>
                    <p class="model-username">@${model.username}</p>
                    </div>
                </div>
            </div>
            <div class="choice nope">NOPE</div>
            <div class="choice like">LIKE</div>
        `;

    // Add the card to the container
    container.appendChild(modelCard);
  }


  // Show a message when there are no more models available to display
  if (models.length == 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.classList.add('swipe-empty');
    emptyMessage.innerHTML = `
            <p>No hay más modelos disponibles</p>
            <p>Intenta de nuevo más tarde</p>
        `;
    container.appendChild(emptyMessage);
  }
}

// Update this function to call renderModels with the appropriate array
async function updateGenderAndFetchModels(selectedGender) {
  gender = selectedGender; // Update the global gender variable

  // Update the hidden input value
  document.getElementById('swipeModel-gender').value = gender;

  // Update the button text
  const selectButton = document.querySelector('.select-default button p');
  selectButton.textContent = gender === 'female' ? 'Girl' : 'Boy';

  // Clear the model cards container
  const container = document.getElementById('model-cards-container');
  container.innerHTML = ''; // Clear existing model cards

  // Logic to fetch and render models based on the selected gender
  try {
    const models = gender === 'female' ? femaleModels : maleModels; // Use the preloaded models
    if (models.length === 0) {
      // Fetch models only if the array is empty
      const formData = new FormData();
      formData.append('gender', gender);
      const response = await sendPostRequest({ url: `${apiURL}`, data: formData });
      if (gender === 'female') {
        femaleModels = response.data; // Store female models
      } else {
        maleModels = response.data; // Store male models
      }
    }
    renderModels(); // Render the models using the global gender variable

  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

// Event listeners for the selection cards
document.querySelector('.swipeModel-selector-card.female').addEventListener('click', () => {
  updateGenderAndFetchModels('female');
  setTimeout(() => {
    checkModelUrls();
  }, 200);
  document.querySelector('.swipeModel-gender').classList.remove('male');
  document.querySelector('.swipeModel-gender').classList.add('female');
});

document.querySelector('.swipeModel-selector-card.male').addEventListener('click', () => {
  updateGenderAndFetchModels('male');
  setTimeout(() => {
    checkModelUrls();
  }, 200);
  document.querySelector('.swipeModel-gender').classList.remove('female');
  document.querySelector('.swipeModel-gender').classList.add('male');
});

// Add this code at the end of the file
document.querySelectorAll('.swipeModel-selector-card').forEach(card => {
  card.addEventListener('click', () => {
    // Hide the selection container
    document.querySelector('.swipeModel-selector-container').classList.add('hidden');
    // Show the cards container
    document.querySelector('.swipeModel-cards').classList.remove('hidden');
  });
});

// Add this function to handle gender selection
function selectGender(gender) {
  // Update the hidden input value
  document.getElementById('swipeModel-gender').value = gender;

  // Update the button text
  const selectButton = document.querySelector('.select-default button');
  selectButton.textContent = gender === 'female' ? 'Girl' : 'Boy';

  // Call the function to fetch and render models based on the selected gender
  updateGenderAndFetchModels(gender);
}

// Add event listeners for the selection buttons
document.querySelectorAll('.select-option').forEach(option => {
  option.addEventListener('click', () => {
    const gender = option.value; // Get the value of the selected button
    const selectButton = document.querySelector('.select-default button');
    const genderContainer = document.querySelector('.swipeModel-gender'); // Get the gender container

    // Update the button content
    // selectButton.innerHTML = `<i class="icon ${option.querySelector('i').className}"></i> <p> ${gender === 'female' ? 'Girl' : 'Boy'} </p>`;

    // Remove existing gender classes
    genderContainer.classList.remove('female', 'male');

    // Add the new gender class
    genderContainer.classList.add(gender);

    updateGenderAndFetchModels(gender);
  });
});

// Function to fetch models
async function fetchModels() {
  try {
    const femaleResponse = await sendPostRequest({ url: `${apiURL}`, data: { gender: 'female' } }); // Fetch female models
    femaleModels = femaleResponse.data; // Store female models in the array

    const maleResponse = await sendPostRequest({ url: `${apiURL}`, data: { gender: 'male' } }); // Fetch male models
    maleModels = maleResponse.data; // Store male models in the array

  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

// Call fetchModels when the library is loaded
fetchModels(); // Load models on library initialization

// Function to fetch more models
async function fetchMoreModels(gender) {
  try {
    const formData = new FormData();
    formData.append('gender', gender);
    const response = await sendPostRequest({ url: `${apiURL}`, data: formData });

    // Append new models to the existing array
    if (gender === 'female') {
      femaleModels.push(...response.data); // Add new female models
    } else {
      maleModels.push(...response.data); // Add new male models
    }
  } catch (error) {
    console.error('Error fetching more models:', error);
  }
}
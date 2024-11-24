const DECISION_THRESHOLD = 100
let isAnimating = false
let pullDeltaX = 0
let viewCount = parseInt(localStorage.getItem('viewCount')) || 0;
let freeSpinCount = parseInt(localStorage.getItem('spinCount')) || 0;
// Cuantas modelos hay que ver para ganar 1 spin
let modelsView = 15;

function updateSpinCount() {
  localStorage.setItem('spinCount', freeSpinCount);
}

function updateViewCount() {
  localStorage.setItem('viewCount', viewCount);
}

function incrementViewCount() {
  viewCount++;
  updateViewCount();

  if (viewCount % modelsView === 0) {
    freeSpinCount++;
    updateSpinCount()
  }
}

function onViewModel() {
  incrementViewCount();
}

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
      incrementViewCount()

      if (goLike) {
        // Logica cuando se da Like
        openActualFeaturedUrl();
      } else {
        // Logica cuando se da Pass
      }

      actualCard.classList.add(goLike ? 'go-right' : 'go-left')
      actualCard.addEventListener('transitionend', () => {
        actualCard.remove()
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
    incrementViewCount()
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


// Array de modelos a renderizar
let models = [];

// Función para renderizar modelos en el contenedor
function renderModels(models) {
  const container = document.getElementById('model-cards-container');
  container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas cards

  models.forEach((model) => {
    // Crear una nueva card de modelo
    const modelCard = document.createElement('div');
    modelCard.classList.add('swipe-model');
    if (model.feature) modelCard.classList.add('featured');

    modelCard.setAttribute('data-profile', model.url_profile);
    modelCard.setAttribute('data-url', model.url_of);

    // Construir el contenido de la card
    modelCard.innerHTML = `
            <div class="swipe-model-card">
                <div class="swipe-model-picture">
                    <img src="${model.imageUrl}" alt="${model.nombre}" />
                </div>
                <div class="swipe-model-content">
                    <div class="model-info">
                    <p class="model-name">${model.nombre}</p>
                    <p class="model-username">@${model.username}</p>
                    </div>
                </div>
            </div>
            <div class="choice nope">NOPE</div>
            <div class="choice like">LIKE</div>
        `;

    // Agregar la card al contenedor
    container.appendChild(modelCard);
  });

  // Insertar el mensaje de "no hay más personas" al final
  const emptyMessage = document.createElement('div');
  emptyMessage.classList.add('swipe-empty');
  emptyMessage.innerHTML = `
        <p>No hay más personas cerca de ti</p>
        <p>Vuelve a intentarlo más tarde</p>
    `;
  container.appendChild(emptyMessage);
}

// Función para usar datos de prueba si el fetch falla
function useMockData(gender) {
  const mockData = gender === 'female' ? [
    {
      "nombre": "Jane Doe",
      "username": "jane_doe",
      "url_profile": "https://dudjob.com/jane_doe/profile",
      "url_of": "https://onlyfans.com/jane_doe",
      "imageUrl": "/static/images/models/model-1.png",
      "feature": false
    },
    {
      "nombre": "Emily Davis",
      "username": "emily_davis",
      "url_profile": "https://dudjob.com/emily_davis/profile",
      "url_of": "https://onlyfans.com/emily_davis",
      "imageUrl": "/static/images/models/model-2.png",
      "feature": true
    },
    {
      "nombre": "Sophia Martinez",
      "username": "sophia_martinez",
      "url_profile": "https://dudjob.com/sophia_martinez/profile",
      "url_of": "https://onlyfans.com/sophia_martinez",
      "imageUrl": "/static/images/models/model-3.png",
      "feature": false
    },
    {
      "nombre": "Olivia Taylor",
      "username": "olivia_taylor",
      "url_profile": "https://dudjob.com/olivia_taylor/profile",
      "url_of": "https://onlyfans.com/olivia_taylor",
      "imageUrl": "/static/images/models/model-4.png",
      "feature": true
    },
    {
      "nombre": "Ava Anderson",
      "username": "ava_anderson",
      "url_profile": "https://dudjob.com/ava_anderson/profile",
      "url_of": "https://onlyfans.com/ava_anderson",
      "imageUrl": "/static/images/models/model-1.png",
      "feature": false
    }
  ] : [
    {
      "nombre": "John Doe",
      "username": "john_doe",
      "url_profile": "https://dudjob.com/john_doe/profile",
      "url_of": "https://onlyfans.com/john_doe",
      "imageUrl": "/static/images/image-not-found/male/1.png",
      "feature": true
    },
    {
      "nombre": "James Smith",
      "username": "james_smith",
      "url_profile": "https://dudjob.com/james_smith/profile",
      "url_of": "https://onlyfans.com/james_smith",
      "imageUrl": "/static/images/image-not-found/male/2.png",
      "feature": false
    },
    {
      "nombre": "Robert Johnson",
      "username": "robert_johnson",
      "url_profile": "https://dudjob.com/robert_johnson/profile",
      "url_of": "https://onlyfans.com/robert_johnson",
      "imageUrl": "/static/images/image-not-found/male/3.png",
      "feature": true
    },
    {
      "nombre": "Michael Brown",
      "username": "michael_brown",
      "url_profile": "https://dudjob.com/michael_brown/profile",
      "url_of": "https://onlyfans.com/michael_brown",
      "imageUrl": "/static/images/image-not-found/male/4.png",
      "feature": false
    },
    {
      "nombre": "David Williams",
      "username": "david_williams",
      "url_profile": "https://dudjob.com/david_williams/profile",
      "url_of": "https://onlyfans.com/david_williams",
      "imageUrl": "/static/images/image-not-found/male/5.png",
      "feature": true
    }
  ];

  models = mockData;
  console.log(`Fetched ${gender} models using mock data:`, models);

  // Renderizar los modelos con los datos de prueba
  renderModels(models);
}

// Añadir esta función para actualizar las cards y el botón de selección
async function updateGenderAndFetchModels(gender) {
  // Actualiza el valor del input oculto
  document.getElementById('swipeModel-gender').value = gender;

  // Actualiza el texto del botón
  const selectButton = document.querySelector('.select-default button');
  selectButton.textContent = gender === 'female' ? 'Girl' : 'Boy';
  // Lógica para obtener y renderizar modelos según el género seleccionado
  try {
    const response = await fetch(`${apiURL}${gender}`);
    if (!response.ok) throw new Error('Network response was not ok');

    // Suponiendo que la respuesta sea un array de modelos
    models = await response.json();
    renderModels(models);

  } catch (error) {
    console.error('Error fetching models:', error);

    // Fallback a datos de prueba si ocurre un error
    useMockData(gender);
  }
}

// Event listeners para los cards de selección
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

// Añadir este código al final del archivo
document.querySelectorAll('.swipeModel-selector-card').forEach(card => {
  card.addEventListener('click', () => {
    // Ocultar el contenedor de selección
    document.querySelector('.swipeModel-selector-container').classList.add('hidden');
    // Mostrar el contenedor de tarjetas
    document.querySelector('.swipeModel-cards').classList.remove('hidden');
  });
});

// Añadir esta función para manejar la selección de género
function selectGender(gender) {
  // Actualiza el valor del input oculto
  document.getElementById('swipeModel-gender').value = gender;

  // Actualiza el texto del botón
  const selectButton = document.querySelector('.select-default button');
  selectButton.textContent = gender === 'female' ? 'Girl' : 'Boy';

  // Llama a la función para obtener y renderizar modelos según el género seleccionado
  updateGenderAndFetchModels(gender);
}

// Añadir event listeners para los botones de selección
document.querySelectorAll('.select-option').forEach(option => {
  option.addEventListener('click', () => {
    const gender = option.value; // Obtener el valor del botón seleccionado
    const selectButton = document.querySelector('.select-default button');
    const genderContainer = document.querySelector('.swipeModel-gender'); // Obtener el contenedor del género

    // Actualiza el contenido del botón
    selectButton.innerHTML = `<i class="icon ${option.querySelector('i').className}"></i> ${gender === 'female' ? 'Girl' : 'Boy'}`;

    // Elimina las clases de género existentes
    genderContainer.classList.remove('female', 'male');

    // Agrega la nueva clase de género
    genderContainer.classList.add(gender);

    updateGenderAndFetchModels(gender);
  });
});
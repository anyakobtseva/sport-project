import axios from 'axios';



// --- Start Anna --- //
// import { prepareGiveRatingModal } from './give-rating';
// const giveRatingButton = document.querySelector('.modal-btn-rating');
// const modalGiveRating = document.querySelector('.modal-give-rating');
// const URL = 'https://energyflow.b.goit.study/api';
// --- End Anna --- //

// export async function renderExercise(id) {
//   try {
//     const backDrop = document.querySelector('.backdrop');
//     For testing
//     const exercises = (await axios.get(`${URL}/exercises`)).data.results;
//     const { _id: exerciseId, rating } =
//       exercises[(exercises.length * Math.random()) | 0];

    // ----

    // --- Start Anna --- //
    // giveRatingButton.addEventListener('click', (event) => {
    //   backDrop.classList.add('visually-hidden');
    //   markupModal.classList.add('hidden');
    //   prepareGiveRatingModal(exerciseId, rating);
    //   modalGiveRating.classList.remove('hidden');
    //   event.stopImmediatePropagation();
    // });
    // --- End Anna --- //

    

const markupModal = document.querySelector('.modal-window');

export async function renderExercise(id) {
  try {
    const test = await axios.get(`https://energyflow.b.goit.study/api/exercises/${id}`);
    const exerciseModalData = test.data;
    console.log(exerciseModalData);

    const stars = document.getElementsByClassName("modal-rating-stars")[0];
    stars.innerHTML = exerciseModalData.rating;
    for (let i = 1; i <= 5; i++) {
      if (i < exerciseModalData.rating) {
        stars.innerHTML += `<li>
      
      <svg class="modal-rating-stars-svg" width="18" height="18">
        <use href="../img/sprite.svg#icon-Star-1"></use>
      </svg>
    </li>`;
      } else {
        stars.innerHTML += `<li>
        
        <svg class="modal-rating-stars-svg" width="18" height="18">
          <use href="../img/sprite.svg#icon-Star-1"></use>
        </svg>
      </li>`;
      }
    }


    document.getElementsByClassName("imgGif")[0].src = exerciseModalData.gifUrl;
    document.getElementsByClassName("modal-title")[0].innerHTML = exerciseModalData.name;
    document.getElementsByClassName("modal-info-list-title-value")[0].innerHTML = exerciseModalData.target;
    document.getElementsByClassName("modal-info-list-title-value")[1].innerHTML = exerciseModalData.bodyPart;
    document.getElementsByClassName("modal-info-list-title-value")[2].innerHTML = exerciseModalData.equipment;
    document.getElementsByClassName("modal-info-list-title-value")[3].innerHTML = exerciseModalData.popularity;
    document.getElementsByClassName("modal-info-list-title-value")[4].innerHTML = exerciseModalData.burnedCalories;
    document.getElementsByClassName("descr")[0].innerHTML = exerciseModalData.description;


    const addToFavoritesBtn = document.querySelector('.modal-btn-favorites');
    const backDrop = document.querySelector('.backdrop');

    addToFavoritesBtn.addEventListener('click', addToFavoritesClickHandler);

    function addToFavoritesClickHandler(e) {
      e.stopPropagation();
      e.preventDefault();
      let favorites = JSON.parse(localStorage.getItem("favorites"))
      if (favorites == undefined) {
        favorites = [];
      }

      const index = favorites.findIndex((exercise) => exercise.name === exerciseModalData.name);

      if (index !== -1) {
        favorites.splice(index, 1);
        addToFavoritesBtn.innerText = 'Add to favorites';
        iziToast.show({
          message: 'Упражнение удалено из избранного',
          messageColor: '#f7f7fc',
          backgroundColor: '#3939db',
          position: 'topRight'
        });
      } else {
        favorites.push(exerciseModalData);
        addToFavoritesBtn.innerText = 'Remove from favorites';
        iziToast.show({
          message: 'Упражнение добавлено в избранное',
          messageColor: '#f7f7fc',
          backgroundColor: '#219c2b',
          position: 'topRight'
        });
      }

        localStorage.setItem("favorites", JSON.stringify(favorites))
    }

    const closeBtn = document.querySelector('.modal-btn-close');
    closeBtn.addEventListener('click', closeModal);

    function closeModal() {
      markupModal.innerHTML = '';
      backDrop.classList.remove('is-open');
      addToFavoritesBtn.removeEventListener('click', addToFavoritesClickHandler);
      closeBtn.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', escapeKeyHandler);
      backDrop.removeEventListener('click', backdropClickHandler);
    }

    function escapeKeyHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
    function backdropClickHandler() {
      closeModal();
    }


    document.addEventListener('keydown', escapeKeyHandler);

    backDrop.addEventListener('click', backdropClickHandler);

  } catch (error) {

  }
}


renderExercise("64f389465ae26083f39b17a4");

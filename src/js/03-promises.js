import Notiflix from 'notiflix';
const form = document.querySelector(`.form`);

form.addEventListener(`submit`, event => {
  const inputDelay = document.querySelector(`input[name="delay"]`);
  const inputStep = document.querySelector(`input[name="step"]`);
  const inputAmount = document.querySelector(`input[name="amount"]`);
  // Nasłuchiwanie wybranych pól

  const delay = parseInt(inputDelay.value);
  const step = parseInt(inputStep.value);
  const amount = parseInt(inputAmount.value);
  // Pobieranie danych

  for (let i = 1; i <= amount; i++) {
    const promiseDelay = delay + (i - 1) * step;
    // Obliczanie opóźnienia

    createPromise(i, promiseDelay)
      .then(({ i, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${i} in ${delay}ms`);
      });
    // Wyświetlanie wyniku
  }
});

function createPromise(i, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ i, delay });
      } else {
        reject({ i, delay });
      }
    }, delay);
  });
  // Skrypt z treści zadania domowego
}

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');


formEl.addEventListener('submit', onSubmit);



function onSubmit(event) {
  event.preventDefault();
  let delay = 0;
  const formElemenents = event.currentTarget.elements;
  delay = Number(formElemenents.delay.value);
  let step = Number(formElemenents.step.value);
  let amount = Number(formElemenents.amount.value);


for (let i = 1; i <= amount; i+=1) {
  createPromise(i, delay)
    .then(({ position, delay }) => { Notify.success(`Fulfilled promise ${position} in ${delay}ms`); })
    .catch(({position, delae})=>{Notify.failure(`Rejected promise ${position} in ${delay}ms`);});
  delay += step;
}

}




function createPromise(position, delay) {
  return new Promise((resolve, reject ) => {
     const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
    
        resolve({ position, delay });
  } else {
        reject({ position, delay });
  }
    }, delay);
    
  }
  
) 
}

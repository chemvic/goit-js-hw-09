
const formEl = document.querySelector('.form');


formEl.addEventListener('submit', onSubmit);



function onSubmit(event) {
  event.preventDefault();
 
  const formElemenents = event.currentTarget.elements;
  let delay = Number(formElemenents.delay.value);
  let step = Number(formElemenents.step.value);
  let amount = Number(formElemenents.amount.value);

console.log(delay);
console.log(step);
  console.log(amount);
  

for (let i = 1; i <= amount; i+=1) {
  createPromise(i, delay)
    .then(({ position, delay }) => { console.log(`✅ Fulfilled promise ${position} in ${delay}ms`); })
    .catch(({position, delae})=>{console.log(`❌ Rejected promise ${position} in ${delay}ms`);});
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

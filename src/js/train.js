const makePromise = () => {
    return new Promise((resolve, reject) => {
        const orOr = Math.random() > 0.5;
        console.log(orOr);
        const timeout = 1000;
        setTimeout(() => {
            if (orOr) {
                resolve('А я тебя поймал!!!)))','color:green; font-size:24px;');
            }
            reject('Ой, убежал(((', 'color:red; font-size:24px;');
        }, timeout);
     
    });
}
makePromise()
    .then(success => console.log('%c А я тебя поймал!!!)))','color:green; font-size:24px;'))
    .catch(fail => console.log('%c Ой, убежал(((', 'color:red; font-size:24px;'));

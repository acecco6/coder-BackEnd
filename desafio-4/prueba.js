
function acceso1() {
    return new Promise ((resolve, reject)=>{
        let acceso = Math.random()
        setTimeout(()=>{
            if (acceso > 0.2) {
                resolve('Acceso 1');
            } else {
                reject ('Acceso 1 Denegado');
            }
        },3000)
    });
}

function acceso2() {
    return new Promise ((resolve, reject)=>{
        let acceso = Math.random()
        setTimeout(()=>{
            if (acceso > 0.2) {
                resolve('Acceso 2');
            } else {
                reject ('Acceso 2 Denegado');
            }
        },2000)
    });
}

function acceso3() {
    return new Promise ((resolve, reject)=>{
        let acceso = Math.random()
        setTimeout(()=>{
            if (acceso > 0.2) {
                resolve('Acceso 3');
            } else {
                reject ('Acceso 3 Denegado');
            }
        },5000)
    });
}

function acceso4() {
    return new Promise ((resolve, reject)=>{
        let acceso = Math.random()
        setTimeout(()=>{
            if (acceso > 0.2) {
                resolve('Acceso 4');
            } else {
                reject ('Acceso 4 Denegado');
            }
        },1000)
    });
}

function acceso5() {
    return new Promise ((resolve, reject)=>{
        let acceso = Math.random()
        setTimeout(()=>{
            if (acceso > 0.2) {
                resolve('Acceso 5');
            } else {
                reject ('Acceso 5 Denegado');
            }
        },4000)
    });
}

function GeneradorNum() {
    for (let i = 0; i < 25; i++) {
        let num=Math.random().toFixed(2)
        console.log(num)
    }   
}



acceso1()
    .then(result=>console.log('ok', result))
    .catch(result=>console.log('error', result))
    .finally(()=>console.log(Math.random()));

acceso2()
    .then(result=>console.log('ok', result))
    .catch(result=>console.log('error', result))
    .finally(()=>console.log(Math.random()));

acceso3()
    .then(result=>console.log('ok', result))
    .catch(result=>console.log('error', result))
    .finally(()=>console.log(Math.random()));

acceso4()
    .then(result=>console.log('ok', result))
    .catch(result=>console.log('error', result))
    .finally(()=>console.log(Math.random()));

acceso5()
    .then(result=>console.log('ok', result))
    .catch(result=>console.log('error', result))
    .finally(()=>console.log(Math.random()));

GeneradorNum()
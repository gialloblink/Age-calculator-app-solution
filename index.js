// seleziono i nodi dal DOM
const form = document.querySelector('#form')
const inputDay = document.querySelector('#inputDay');
const inputMonth = document.querySelector('#inputMonth');
const inputYear = document.querySelector('#inputYear');
const submit = document.querySelector('.submit');
const outputDay = document.querySelector('#days');
const outputMonth = document.querySelector('#months');
const outputYear = document.querySelector('#years');


let today = new Date()
const daysForMonth = [31,29,31,30,31,30,31,31,30,31,30,31]

// ****** event listeners ******

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    defult()
    let checkDay = checkEmptyField(inputDay)
    let checkMonth = checkEmptyField(inputMonth)
    let checkYear = checkEmptyField(inputYear)
    if (checkDay && checkMonth && checkYear) {
        checkDay= dayValidation();
        checkMonth = monthValidation()
    }
    if (checkDay && checkMonth && checkYear) {
        let dataInserita= new Date(inputYear.value,inputMonth.value-1,inputDay.value)
        if (dataInserita.getTime()<today.getTime()) {
            setapCotent(dataInserita)
            return
        }
        alert("inserita una data nel futuro");
        return
    }
})


// ****** functions ******

function setapCotent(insertedDate) {
    let differenzaAnni = today.getFullYear() - insertedDate.getFullYear()
    let differenzaMesi = today.getMonth() - insertedDate.getMonth()
    let differenzaGiorni = today.getDate() - insertedDate.getDate()
    
    if (differenzaMesi<0 || (differenzaMesi === 0 && differenzaGiorni<0)) {
        differenzaAnni-=1;
    }
    if ((differenzaMesi<0 && differenzaGiorni>=0) || (differenzaMesi<=0 && differenzaGiorni<0)) {
        differenzaMesi+=12;
    }
    
    if ( (differenzaMesi>0 && differenzaGiorni<0)||(differenzaGiorni<0 && differenzaMesi===12) ) {
        differenzaMesi--;
    }
    
    if ((today.getMonth() - insertedDate.getMonth())<=0&& differenzaGiorni<0) {
        differenzaGiorni= daysForMonth[today.getMonth()-1]-Math.abs(differenzaGiorni)
    }
    
    if (today.getMonth() !== insertedDate.getMonth() && differenzaGiorni<0 ) {
        differenzaGiorni=Math.abs(Math.abs(differenzaGiorni)-daysForMonth[today.getMonth()-1])
    }
        outputYear.textContent=differenzaAnni
        outputMonth.textContent=differenzaMesi
        outputDay.textContent=differenzaGiorni
}


function defult() {
    inputDay.nextElementSibling.textContent=''
    inputDay.classList.remove('errorInput')
    inputDay.previousElementSibling.classList.remove('error')
    inputMonth.nextElementSibling.textContent=''
    inputMonth.classList.remove('errorInput')
    inputMonth.previousElementSibling.classList.remove('error')
    inputYear.nextElementSibling.textContent=''
    inputYear.classList.remove('errorInput')
    inputYear.previousElementSibling.classList.remove('error')
}

function checkEmptyField(input) {
    if (input.value<1) {
        addClassError(input, 'This field is required')
        return false
    }
    return true
}

function monthValidation() {
   if(inputMonth.value > 12){
        addClassError(inputMonth,'Must be a valid month')
        return false
    }
    return true
}

function dayValidation() {
    const mese= Number(inputMonth.value)
   if(inputDay.value>31){
        addClassError(inputDay,'Must be a valid day')
        return false

    } else if ((mese===4 || mese===6 || mese===9 || mese===11)
                && 
                inputDay.value>30){
                addClassError(inputDay,'Must be a valid day')
        return false

    } else if(mese===2 && inputDay.value>28){
                addClassError(inputDay,'Must be a valid day')
                return false
    }
    return true
}

function addClassError (input,textError) {
    input.nextElementSibling.textContent=textError;
    input.classList.add('errorInput');
    input.previousElementSibling.classList.add('error');
}
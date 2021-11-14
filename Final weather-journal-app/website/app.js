/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const key = "00fc2967f7b4d95b93d15e5d43e64586";
const btn = document.querySelector('#generate');


btn.addEventListener('click', action);
async function action() {
    const zip = document.querySelector('#zip').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=metric`;
    const feelings = document.getElementById("feelings").value;
    try{
        const result = await fetch(url);
        const data = await result.json();
        const temp = data.main.temp;
        await fetch('/saveData', {
            method: "POST",
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: newDate,
                temp: temp,
                feelings: feelings
            })
        });
        const res = await fetch('/getData')
        const final = await res.json();
        console.log(final.temp);
        let date = document.getElementById("date");
        let temprature = document.getElementById("temp");
        let content = document.getElementById("content");
        date.innerText = `Date : ${final.date}`
        temprature.innerText = `temprature : ${final.temp}`
        content.innerText = `your feeling is ${final.feelings}`

    }
    catch(err){console.log(err)}
};

// let updateUI = document.getElementById("feelings");
// updateUI.innerText = final.feelings
// updateUI.innerText = final.date
// updateUI.innerText = final.temp


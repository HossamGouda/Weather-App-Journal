/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const key = "00fc2967f7b4d95b93d15e5d43e64586";
const btn = document.querySelector('#generate');


btn.addEventListener('click', action); //adding event listener with a call back function to perform action when user click on generate button
async function action() {                                     // Asyncrounus function 
    const zip = document.querySelector('#zip').value;        // getting the value of zip code user input 
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=metric`;  // API url included with zip and key 
    const feelings = document.getElementById("feelings").value;    // getting the value of feeling  user input
    try{                                                          // to handle  code errors 
        const result = await fetch(url);                         // using fetch to get the data fro api service 
        const data = await result.json();                      // converting the data coming from api server to JS object by json 
        const temp = data.main.temp;                           // access the object to get the requested temp. only  
        await fetch('/saveData', {                             // fetching the received data from api to local server using the method POSt 
            method: "POST",
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                           // converting the data to save it in our global vrialble dataobject in the local server
                date: newDate,
                temp: temp,
                feelings: feelings
            })
            
        }).then(updateUI())               //promise function to updae the user UI and show final results
        ;       
    }
    catch(err){console.log(err)}
};


const updateUI = async () => {

    const request = await fetch('/getData');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feelings;
    } catch (error) {
        console.log("error", error);
    }
}
//SETUP 
//1. references
//2. STATE
const BASE_URL= 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/ian-balderston/events'

//STATE
const state ={
parties: []
}
const partiesContainer = document.getElementById('parties')

//FETCH CALLS 
// /GET  --DONE
// /POST 
// /DELETE *

//GET 
async function getParties() {
    try {
        const response = await fetch(BASE_URL)
        const json = await response.json()

        return json.data  
    } catch(err) {
        console.log(err)
    }
}

//EVENT LISTENERS 

//POST
const form = document.querySelector('#add')

form.addEventListener('submit', postParty)

async function postParty(event) {

    event.preventDefault()
try {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            name: form.name.value,
            date: `${form.date.value}T00:00:00Z`, 
            location: form.location.value,
            description: form.description.value,                  
        })
    })
    
    await renderParties()
    } catch(error) {
        console.error(error)
    }
} 






async function renderParties() {
    state.parties = await getParties()
    const htmlParties = state.parties.map(event =>{

        let div = document.createElement('div') 

        div.className = 'card'
        div.innerHTML = `
        <h3>${event.name}</h3> 
        <p>${event.date}</p> 
        <p>${event.location}</p>
        <p>${event.description}</p>
       `
        return div
       
    })
    partiesContainer.replaceChildren(...htmlParties)
}

async function startApp() {
    await getParties()

    renderParties()
}

startApp()
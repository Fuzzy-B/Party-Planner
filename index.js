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
            id: Math.floor(Math.random() * 2000),
            name: form.name.value,
            description: form.description.value,
            // date: `${form.date.value}T00:00:00Z`, 
            date: "2024-01-07T12:20:44.000Z",
            location: form.location.value,
            cohortId: '223'                   
        })
    })
    
    await renderParties()
    } catch(error) {
        console.error(error)
    }
} 
 
//DELETE 
async function deleteParty(eventId) {
    try {
        await fetch (BASE_URL+'/'+eventId, {
            method: 'DELETE'
        })
    } catch(error) {
        console.error(error)
    }
    renderParties()
}


async function renderParties() {
    state.parties = await getParties()
    const htmlParties = state.parties.map(event =>{
        const date = new Date(Date.parse(event.date)) //DAX'S FIX ISO 8601
        let div = document.createElement('div') 

        div.className = 'card'
        div.innerHTML = `
        <h3>${event.name}</h3> 
        <p>${date}</p> 
        <p>${event.location}</p>
        <p>${event.description}</p> 
       `

       const deleteButton = document.createElement('button')
       deleteButton.innerText = 'Delete'
       deleteButton.addEventListener('click', () => deleteParty(event.id))
       div.appendChild(deleteButton)


        return div
       
    })
    partiesContainer.replaceChildren(...htmlParties)
}

async function startApp() {
    await getParties()

    renderParties()
}

startApp()


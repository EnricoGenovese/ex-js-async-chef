/*
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef
*/

/*
Note del docente
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch
*/


async function getChefBirthday(id) {
    let recipe;
    try {
        recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await recipeResponse.json();
    } catch (error) {
        throw new Error(`Could not fetch recipe at id: ${id}`)
    }

    let user;
    try {
        userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json();
    } catch (error) {
        throw new Error(`Could not fetch user at id: ${recipe.userId}`)
    }

    return user.birthDate;
}

getChefBirthday(1234567890)
    .then(response => console.log('Il compleanno dello chef è il:', response))
    .catch(err => console.error(err));



// Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

async function getChefBirthday(id) {
    let recipe;
    try {
        recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await recipeResponse.json();
    } catch (error) {
        throw new Error(`Could not fetch recipe at id: ${id}`)
    }
    if (recipe.message) {
        throw new Error(recipe.message);
    }
    let user;
    try {
        userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json();
    } catch (error) {
        throw new Error(`Could not fetch user at id: ${recipe.userId}`)
    }
    if (user.message) {
        throw new Error(user.message);
    }

    return user.birthDate;
}

getChefBirthday(1234567890)
    .then(response => console.log('Il compleanno dello chef è il:', response))
    .catch(err => console.error(err));

// Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.

import dayjs from 'dayjs';

async function fetchJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getChefBirthday(id) {
    let recipe;
    try {
        recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
    } catch (error) {
        throw new Error(`Could not fetch recipe at id: ${id}`)
    }
    if (recipe.message) {
        throw new Error(recipe.message);
    }
    let user;
    try {
        user = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`);
    } catch (error) {
        throw new Error(`Could not fetch user at id: ${recipe.userId}`)
    }
    if (user.message) {
        throw new Error(user.message);
    }

    return dayjs(`${user.birthDate}`).format('DD/MM/YYYY');
}


(async () => {
    try {
        const data = await getChefBirthday(3);
        console.log('Il compleanno dello chef è il:', data)
    } catch (err) {
        console.error(err)
    } finally {
        console.log('Done')
    }
})();
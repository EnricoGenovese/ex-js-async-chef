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
        throw new Error(`Could not fetch recipe da id: ${id}`)
    }
    let user;
    try {
        userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json();
    } catch (error) {
        throw new Error(`Could not fetch user da id: ${recipe.userId}`)
    }

    return user.birthDate;
}

getChefBirthday(1234567890)
    .then(response => console.log('Il compleanno dello chef è il:', response))
    .catch(err => console.error(err));
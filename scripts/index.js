const access_token = '1571386523194859';
const url = 'https://superheroapi.com/api.php/' + access_token + '/search/';

checkLocalStorage();

const searchBar = document.getElementById('search-data');
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    console.log("Searching for: ", searchString);
    if (searchString.length < 2) {
        document.getElementById('results').innerHTML = 'Add atleast 3 characters';
    } else {
        searchHero(searchString);
    }
});


function checkLocalStorage() {
    if (localStorage.getItem('superheroFavs') == null) {
        localStorage.setItem('superheroFavs', JSON.stringify(Array()));
    }
}


document.addEventListener('click', (event) => {

    if (event.target.id == 'details_btn') {
        var id = event.target.parentNode.id;
        window.open('./details.html' + '?id=' + id, "_self");
    }

});


async function searchHero(searchString) {


    let response = await fetch(url + searchString);
    if (response.ok) {
        renderData(await response.json());
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

function renderData(data) {

    if (data.response == 'error' || data.results.length === 0) {
        document.getElementById('results').innerHTML = data.error;
    } else {

        var results = document.getElementById('results');
        results.remove();


        var result_container = document.getElementById('result-container');
        var results = document.createElement('DIV');
        results.id = 'results';
        result_container.appendChild(results);


        data.results.forEach((element) => {
            results.appendChild(getCard(element));
        });
    }
}


function getCard(data) {

    var cardContainer = document.createElement('DIV');
    cardContainer.className = 'card-container center';
    cardContainer.id = data.id;
    var srcFav;
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));


    cardContainer.innerHTML = `
        <div class="card-img-container">
            <img src="${data.image.url}">
        </div>
        <div id="details_btn" class="card-name">${data.name}</div>
        
    `
    return cardContainer;
}


function customAlert(type, message) {
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}
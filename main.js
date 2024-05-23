const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetelasContent = document.querySelector(".recipe-detelas-content");
const recipeDetelas = document.querySelector(".recipe-detelas");
const closeBtn = document.querySelector(".close");
const loader = document.querySelector(".loader");
const searchMessage = document.querySelector(".searchmessage");
const noMealsMessage = document.querySelector(".no-meals-message");

 searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    const meals = await getData(searchInput);
     displayData(meals);
});

async function getData(query) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response.meals);
return response.meals
}

function displayData(meals) {
    let cols = "";
    if (meals) {
        meals.forEach(meal => {
            cols += `
                <div class="col-md-3">
                    <div class="layer d-flex justify-content-center align-items-center">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    <div class="image">
                        <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}">
                    </div>
                    <div class="text text-center bg-white text-black">
                        <p class="dish">${meal.strCategory} dish</p>
                        <p class="area">${meal.strArea}</p>
                        <button class="view-recipe-btn btn btn-danger my-1" data-id="${meal.idMeal}">view recipe</button>
                    </div>
                </div>
            `;
        });
        noMealsMessage.style.display = 'none';
        searchMessage.style.display="none"
    } else { 
        noMealsMessage.style.display = 'block';
        searchMessage.style.display="none"
    }
    recipeContainer.innerHTML = cols;
   addRecipeButtonListeners();
}

function addRecipeButtonListeners() {
    const viewRecipeButtons = document.querySelectorAll('.view-recipe-btn');
    viewRecipeButtons.forEach(button => {
        button.addEventListener('click', async function() {
            loader.style.display = 'block';
            recipeDetelas.style.display = 'block';
            const mealId = this.getAttribute('data-id');
            const mealDetails = await getMealDetails(mealId);
            showMealDetails(mealDetails);
            loader.style.display = 'none';
            recipeDetelasContent.style.display = 'block';
        });
    });
}

async function getMealDetails(id) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await data.json();
    return response.meals[0];
}

const fetshingredent = (meal) => {
    let Ingredents = "";
    for (let i = 1; i <= 20; i++) {
        const Ingredent = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (Ingredent && Ingredent.trim() !== "" && measure && measure.trim() !== "") {
            Ingredents += `<li>${measure} ${Ingredent}</li>`;
        } else if (Ingredent && Ingredent.trim() !== "") {
            Ingredents += `<li>${Ingredent}</li>`;
        } else {
            break;
        }
    }
    return Ingredents;
}

function showMealDetails(meal) {
    recipeDetelasContent.innerHTML = `
        <div class="ms-2">
            <h2 class="text-center">${meal.strMeal}</h2>
            <h3 class="ms-1">Ingredients:</h3>
            <ul class="ms-2">${fetshingredent(meal)}</ul>
        </div>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
        <button class="youtube btn btn-danger mb-2">view youtube</button>
    `;
}

closeBtn.addEventListener('click', () => {
    recipeDetelas.style.display = 'none';
});

















const rowData = document.querySelector("#myMeals");
const submitBtn = document.querySelector("#submitBtn");

//! ========================== loader Functions ==========================
function loaderIn() {
    $("body").addClass("overflow-hidden")
    $('.loading-screen').fadeIn(10, function () {
        $('.loading-screen').fadeOut(500, function () {
            $("body").removeClass("overflow-hidden")
        })
    })
}

function loaderOut() {
    $("body").addClass("overflow-hidden")
    $('.loading-screen').fadeOut(1000, function () {
        $("body").removeClass("overflow-hidden")
    })
}

//! ======================= Open & close Side-menu =======================
function closeNav() {
    $("#close").addClass("d-none");
    $("#open").removeClass("d-none");
    loopForNavItems(300);
    $(".side-nav-menu").animate({ left: "-16rem" }, 1000);
}

function openNav() {
    $("#open").addClass("d-none");
    $("#close").removeClass("d-none");
    $(".side-nav-menu").animate({ left: "0rem" }, 1000, function () {
        loopForNavItems(0)
    });
}

//! ===================== Side-menu Items Animation ======================
function loopForNavItems(value) {
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: `${value}px`
        }, (i + 5) * 100)
    }
}

//! ======================= Description Snippet ==========================
function getDescriptionSnippet(description) {
    if (description) {
        return description.split(" ").slice(0, 20).join(" ");
    }
    return "Description not available";
}

//! ============================= All Meals ==============================
function displayMeals(mealList) {
    closeNav();
    let meals = []
    for (let index = 0; index < mealList.length; index++) {
        meals += `
        <div class="col-md-3 pb-4">
            <div onclick="getMealDetails('${mealList[index].idMeal}')"
                class="card overflow-hidden object-fit-contain position-relative border-0 rounded-2">
                <img src=${mealList[index].strMealThumb} alt="${mealList[index].strMeal} meal image"
                    class="w-100">
                <div
                    class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${mealList[index].strMeal}</h3>
                </div>
            </div>
        </div>
        `
    }
    rowData.innerHTML = meals;

}

async function getMeals() {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
        let meals = await response.json();
        var myMeals = meals.meals;
        displayMeals(myMeals);
    } catch (error) {
        console.log(error)
    }
}

//! ====================== Search by Meal or Letter ======================
async function search(meal, letter) {
    rowData.innerHTML = " "
    try {
        if (meal) {
            var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
        } else if (letter) {
            var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        }
        let meals = await response.json();
        var searchedMeals = meals.meals;
        console.log(searchedMeals)
        displayMeals(searchedMeals)
    } catch (error) {
        console.log(error)
    }
}

//! =========================== All Categories ===========================
function displayCategories(categorieList) {
    closeNav();
    $("#searchSection").addClass("d-none");
    rowData.innerHTML = ""
    let categories = []
    for (let index = 0; index < categorieList.length; index++) {
        let desc = getDescriptionSnippet(categorieList[index].strCategoryDescription)
        categories += `
        <div class="col-md-3 pb-4">
            <div onclick="getMealsByCategory('${(categorieList[index].strCategory)}')"
                class="card overflow-hidden object-fit-contain position-relative border-0 rounded-2">
                <img src=${categorieList[index].strCategoryThumb} alt="${categorieList[index].strCategory} Category icon"
                    class="w-100">
                <div
                    class="meal-layer position-absolute d-flex flex-column text-center justify-content-center align-items-center text-black p-2">
                    <h3>${categorieList[index].strCategory}</h3>
                    <p>${desc}</p>
                </div>
            </div>
        </div>
        `
    }
    rowData.innerHTML = categories;
}

async function getAllCategories() {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let meals = await response.json();
        var myCategories = meals.categories;
        displayCategories(myCategories);
    } catch (error) {
        console.log(error)
    }
}

//* ================== Meals By Category ======================
async function getMealsByCategory(categoryName) {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        let meals = await response.json();
        var categoryMeals = meals.meals;
        console.log(categoryMeals)
        displayMeals(categoryMeals);
    } catch (error) {
        console.log(error)
    }
}

//! ============================== All Areas =============================
function displayAreas(areaList) {
    closeNav();
    $("#searchSection").addClass("d-none");
    rowData.innerHTML = ""
    let Areas = []
    for (let index = 0; index < areaList.length; index++) {
        Areas += `
        <div class="col-md-3 pb-4">
            <div onclick="getMealsByArea('${areaList[index].strArea}')"
                class="mb-3 text-center overflow-hidden object-fit-contain position-relative border-0 rounded-2">
                <i class="fa-solid fa-house-laptop fa-4x mb-2"></i>
                    <h3>${areaList[index].strArea}</h3>
            </div>
        </div>
        `
    }
    rowData.innerHTML = Areas;
}

async function getAllAreas() {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let areas = await response.json();
        var myAreas = areas.meals;
        console.log(myAreas)
        displayAreas(myAreas);
    } catch (error) {
        console.log(error)
    }
}

//* ====================== Meals By Area =======================
async function getMealsByArea(areaName) {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        let meals = await response.json();
        var areaMeals = meals.meals;
        console.log(areaMeals)
        displayMeals(areaMeals);
    } catch (error) {
        console.log(error)
    }
}

//! ============================ Meal Details ============================
function displayMealDetails(meal) {
    closeNav();
    $("#searchSection").addClass("d-none");
    rowData.innerHTML = `
    <div class="row text-white">
        <div class="col-md-4 p-3">
            <div
                class="card overflow-hidden object-fit-contain position-relative border-0 rounded-2 mb-2">
                <img src=${meal.strMealThumb} alt="${meal.strMeal} meal image"
                    class="w-100">
            </div>
            <h2>${meal.strMeal}</h2>
        </div>

        <div class="col-md-8 p-3">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>

            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>

            <ul class="list-unstyled d-flex g-3 flex-wrap" id="ingredientsList">
                
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap" id="tagsList">
                
            </ul>

            <a target="_blank"
                href=${meal.strSource}
                class="btn btn-success">Source</a>

            <a target="_blank"
                href=${meal.strYoutube}
                class="btn btn-danger">Youtube</a>
        </div>
        </div>
    `;
    displayIngredientsOfMeal(meal);
    displayTags(meal.strTags);
}

async function getMealDetails(mealId) {
    rowData.innerHTML = " "
    $("#searchSection").addClass("d-none");
    loaderIn()
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let meal = await response.json();
        console.log(meal.meals[0])
        displayMealDetails(meal.meals[0])
    } catch (error) {
        console.log(error)
    }
}

//* ===================== Meal Ingredients =====================
function displayIngredientsOfMeal(meal) {
    for (let index = 1; index <= 20; index++) {
        if (meal[`strIngredient${index}`]) {
            const listItem = document.createElement("li");
            listItem.className = "alert alert-info m-2 p-1";
            listItem.textContent = meal[`strMeasure${index}`] + " " + meal[`strIngredient${index}`];
            $("#ingredientsList").append(listItem);
        }
    }
}

//* ======================== Meal Tags =========================
function displayTags(mealTags) {
    let tags = mealTags.split(",")
    for (let index = 0; index < tags.length; index++) {
        const listItem = document.createElement("li");
        listItem.className = "alert alert-danger m-2 p-1";
        listItem.textContent = tags[index];
        $("#tagsList").append(listItem)
    }
}

//! ========================== All Ingredients ===========================
function displayIngredients(ingredientList) {
    closeNav();
    $("#searchSection").addClass("d-none");
    rowData.innerHTML = ""
    let ingredients = []
    for (let index = 0; index < ingredientList.length; index++) {
        let desc = getDescriptionSnippet(ingredientList[index].strDescription)
        ingredients += `
        <div class="col-md-3 pb-4">
            <div onclick="getMealsByIngredient('${ingredientList[index].strIngredient}')"
                class="mb-3 text-center overflow-hidden object-fit-contain position-relative border-0 rounded-2">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${ingredientList[index].strIngredient}</h3>
                    <p>${desc}</p>
            </div>
        </div>
        `
        // .split(" ").slice(0, 20).join(" ")

    }
    rowData.innerHTML = ingredients;
}

async function getAllIngredient() {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let ingredients = await response.json();
        var myIngredients = ingredients.meals;
        displayIngredients(myIngredients);
    } catch (error) {
        console.log(error)
    }
}

//! ======================== Meals By Ingredient =========================
async function getMealsByIngredient(ingredientName) {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
        let meals = await response.json();
        var ingredientMeals = meals.meals;
        console.log(ingredientMeals)
        displayMeals(ingredientMeals);
    } catch (error) {
        console.log(error)
    }
}

//! ============================ Contact =================================
function displayContact() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
}

//! ========================== Regex Object ==============================
const regex = {
    name: /^[a-zA-Z ]+$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,

    validateInput: function (regex, input) {
        return regex.test(input.val());
    },

    nameValidation: function () {
        const input = $("#nameInput");
        if (this.validateInput(this.name, input)) {
            input.addClass('is-valid').removeClass('is-invalid');
            $("#nameAlert").addClass('d-none');
            return true;
        } else {
            input.addClass('is-invalid').removeClass('is-valid');
            $("#nameAlert").removeClass('d-none');
            return false;
        }
    },

    emailValidation: function () {
        const input = $("#emailInput");
        if (this.validateInput(this.email, input)) {
            input.addClass('is-valid').removeClass('is-invalid');
            $("#emailAlert").addClass('d-none');
            return true;
        } else {
            input.addClass('is-invalid').removeClass('is-valid');
            $("#emailAlert").removeClass('d-none');
            return false;
        }
    },

    phoneValidation: function () {
        const input = $("#phoneInput");
        if (this.validateInput(this.phone, input)) {
            input.addClass('is-valid').removeClass('is-invalid');
            $("#phoneAlert").addClass('d-none');
            return true;
        } else {
            input.addClass('is-invalid').removeClass('is-valid');
            $("#phoneAlert").removeClass('d-none');
            return false;
        }
    },

    ageValidation: function () {
        const input = $("#ageInput");
        if (this.validateInput(this.age, input)) {
            input.addClass('is-valid').removeClass('is-invalid');
            $("#ageAlert").addClass('d-none');
            return true;
        } else {
            input.addClass('is-invalid').removeClass('is-valid');
            $("#ageAlert").removeClass('d-none');
            return false;
        }
    },

    passwordValidation: function () {
        const input = $("#passwordInput");
        if (this.validateInput(this.password, input)) {
            input.addClass('is-valid').removeClass('is-invalid');
            $("#passwordAlert").addClass('d-none');
            return true;
        } else {
            input.addClass('is-invalid').removeClass('is-valid');
            $("#passwordAlert").removeClass('d-none');
            return false;
        }
    },

    repasswordValidation: function () {
        const input = $("#repasswordInput");
        if (input.val() === $("#passwordInput").val()) {
            input.addClass('is-valid').removeClass('is-invalid');
            $("#repasswordAlert").addClass('d-none');
            return true;
        } else {
            input.addClass('is-invalid').removeClass('is-valid');
            $("#repasswordAlert").removeClass('d-none');
            return false;
        }
    },

    init: function () {
        $("#nameInput").on('keyup', this.validateAll.bind(this));
        $("#emailInput").on('keyup', this.validateAll.bind(this));
        $("#phoneInput").on('keyup', this.validateAll.bind(this));
        $("#ageInput").on('keyup', this.validateAll.bind(this));
        $("#passwordInput").on('keyup', this.validateAll.bind(this));
        $("#repasswordInput").on('keyup', this.validateAll.bind(this));
    },

    validateAll: function () {
        const allValid = this.nameValidation() &&
            this.emailValidation() &&
            this.phoneValidation() &&
            this.ageValidation() &&
            this.passwordValidation() &&
            this.repasswordValidation();

        const submitBtn = $("#submitBtn");
        if (allValid) {
            submitBtn.removeAttr("disabled");
        } else {
            submitBtn.attr("disabled", true);
        }
    }
};


//! =========================== Document Ready ===========================
$(document).ready(function () {
    //* ======================== loader ========================
    loaderOut()
    getMeals()

    //* ===================== side-nav-menu =====================
    $("#open").on('click', openNav);
    $("#close").on('click', closeNav);

    //* =============== Search and Searched inputs ==============
    $("#search").on('click', function () {
        closeNav();
        rowData.innerHTML = " "
        $("#searchSection").removeClass("d-none");
    });

    $("#searchedMeal").on('input', function (eventInfo) {
        closeNav();
        loaderIn();
        search(eventInfo.target.value, undefined);
    });

    $("#searchedMealByLetter").on('input', function (eventInfo) {
        closeNav();
        let value = eventInfo.target.value;
        if (value.length > 1) {
            eventInfo.target.value = value.slice(0, 1);
        } else {
            loaderIn();
        }
        search(undefined, eventInfo.target.value);
    });

    //* ====================== Categories ======================
    $("#categories").on('click', function () {
        closeNav();
        loaderIn();
        getAllCategories()
    });

    //* ========================= Area =========================
    $("#area").on('click', function () {
        closeNav();
        loaderIn();
        getAllAreas()
    });

    //* ===================== Ingredients ======================
    $("#ingredients").on('click', function () {
        closeNav();
        loaderIn();
        getAllIngredient();
    });

    //* ======================= Contact ========================
    $("#contact").on('click', function () {
        closeNav();
        loaderIn();
        displayContact();
        regex.init();
    });
})
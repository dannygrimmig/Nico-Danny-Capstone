let id  = "64361d7cd55f42890bfc8408";
let display_area = document.getElementById("display-recipes");
let body = document.getElementById("body");
let html = document.getElementById("html");
let initial = true;
let currentRecipe = "";

display_user();

setInterval(popup_open, 1);//Check if popup is open or closed


if(initial)
{
    getPersonalRecipes();
    
}

function display_user()
{
    var request = new XMLHttpRequest();
    var requestURL = 'http://localhost:3001/users/'+id+'';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var user = request.response;
        console.log(user.username);
        let name = document.getElementById("name");
        name.innerHTML = user.username;
    }

  
}



function toggle(button_id)
{
    initial =false;
    let button =  document.getElementById(button_id);

    let feed = document.getElementById("feed");
    let personal = document.getElementById("personal");


    button.style.opacity = 1;
    button.style.textDecoration = "underline";

    if(button_id === "personal")
    {
        display_area.style.backgroundColor = "rgb(237, 241, 243)";
        feed.style.opacity = .5;
        feed.style.textDecoration = "none";
        display_area.innerHTML = "";
        getPersonalRecipes();
    }
    else //if in feed
    {
        display_area.style.backgroundColor = "rgb(237, 241, 243)";
        personal.style.opacity = .5;
        personal.style.textDecoration = "none";
        display_area.innerHTML = "";
        getFeedRecipes();
    }
}

function getPersonalRecipes()
{
    var request = new XMLHttpRequest();
    var requestURL = 'http://localhost:3001/users/'+id+'/recipes';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var personal_recipes = request.response;
        displayPersonalRecipes(personal_recipes);
    }
}

function getFeedRecipes()
{
    var request = new XMLHttpRequest();
    var requestURL = 'http://localhost:3001/recipes';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var all_recipes = request.response;
        displayPersonalRecipes(all_recipes);
    }
}


function displayPersonalRecipes(recipes_array)
{
    let chef;
    let servingSize;
    let directions_array;
    let ingredients_array;
    let image;

    console.log(recipes_array);
    for(let x =0; x < recipes_array.length; x++)
    {
        chef = recipes_array[x].chef;
        dishName = recipes_array[x].dishName;
        servingSize = recipes_array[x].servingSize;
        directions_array = recipes_array[x].directions;
        ingredients_array = recipes_array[x].ingredients;
        image = recipes_array[x].imageURL;

        let recipeDiv = document.createElement('div'); //Add Dishname
        recipeDiv.classList.add("recipe");

        let picture = document.createElement('img');
        picture.setAttribute("src", image);

        let button = document.createElement('button');
        button.setAttribute("onclick", "display_recipe(\""+ chef + "\",\""+ dishName + "\",\""+ servingSize + "\",\""+ directions_array + "\",\""+ ingredients_array + "\",\""+ image + "\")"); //,\""+ directions_array + "\",\""+ ingredients_array + "\"
        button.classList.add("recipe_button");

        recipeDiv.innerHTML = dishName;
        button.appendChild(picture);
        recipeDiv.appendChild(button);
        display_area.appendChild(recipeDiv);
    }
    console.log(chef,dishName,servingSize,directions_array,ingredients_array, image); 
}


function display_recipe(chef, dishName, servingSize, directions_array, ingredients_array,image) //, directions_array ,ingredients_array,
{
    if(currentRecipe === "")
    {
        let popup = document.createElement('div');
        popup.classList.add("popup_recipe");

        //right side of popup
        let rightSide = document.createElement('div');
        rightSide.classList.add("rightSide");


        //Directions
        let direct_container = document.createElement('div');
        direct_container.classList.add("direct_container");

        let directions_header = document.createElement('h2');
        directions_header.classList.add("directions_header");
        directions_header.innerHTML = "PREPARATION";

        let directions = document.createElement('p');
        directions.classList.add("directions");
        directions.innerHTML = directions_array;
        
        direct_container.appendChild(directions_header);
        direct_container.appendChild(directions);


        //Ingredients
        let ingre_container = document.createElement('div');
        ingre_container.classList.add("ingre_container");

        let ingredients_header = document.createElement('h2');
        ingredients_header.classList.add("ingredients_header");
        ingredients_header.innerHTML = "INGREDIENTS";

        let ingredients = document.createElement('p');
        ingredients.classList.add("ingredients");
        ingredients.innerHTML = ingredients_array;

        //Serving amount
        let amount = document.createElement('div');
        amount.classList.add("serving");
        let serving = document.createElement('p');
        serving.innerHTML = "Serving size: " + servingSize;
        amount.appendChild(serving);

        ingre_container.appendChild(ingredients_header);
        ingre_container.appendChild(amount);
        ingre_container.appendChild(ingredients);


        rightSide.appendChild(ingre_container);
        rightSide.appendChild(direct_container);


        //Left side of popup
        let leftSide = document.createElement('div');
        leftSide.classList.add("leftSide");


        let photo = document.createElement('div');
        photo.classList.add("photo");

        let picture = document.createElement('img');
        picture.setAttribute("src", image);

        photo.appendChild(picture);


        let description = document.createElement('div');
        description.classList.add("description");


        let name = document.createElement('div');
        name.classList.add("dishname");

        let foodname = document.createElement('h1');
        foodname.innerHTML = dishName;
        name.appendChild(foodname);


        let person = document.createElement('div');
        person.classList.add("chef");
        let cook = document.createElement('p');
        cook.innerHTML = "Recipe from " + chef;
        person.appendChild(cook);

        description.appendChild(name);
        description.appendChild(person);
    



        leftSide.appendChild(photo);
        leftSide.appendChild(description);


        //Combine on popup
        popup.appendChild(leftSide);
        popup.appendChild(rightSide);
        display_area.prepend(popup);


        // document.getElementsByClassName("recipe").style.visibility = "hidden";
        currentRecipe = popup;
    }
}

function hideRecipe()
{
    // document.getElementsByClassName("recipe").style.visibility = "visible";
    currentRecipe.style.visibility = "hidden";
    currentRecipe ="";
}


function popup_open()
{
    if(currentRecipe != "")
    {
        body.setAttribute("onclick",  "hideRecipe()");
    }
    else
    {
        body.removeAttribute("onclick",  "hideRecipe()");
    }
}

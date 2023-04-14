let id  = "64361d7cd55f42890bfc8408";
let display_area = document.getElementById("display-recipes");
let html = document.getElementById("");
let initial = true;

if(initial)
{
    getPersonalRecipes();
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
        display_area.style.backgroundColor = "black";
        feed.style.opacity = .5;
        feed.style.textDecoration = "none";
        display_area.innerHTML = "";
        getPersonalRecipes();
    }
    else //if in feed
    {
        display_area.style.backgroundColor = "white";
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
        button.setAttribute("onclick", "display_recipe()");
        button.classList.add("recipe_button");

        recipeDiv.innerHTML = dishName;
        button.appendChild(picture);
        recipeDiv.appendChild(button);
        display_area.appendChild(recipeDiv);
    }
    console.log(chef,dishName,servingSize,directions_array,ingredients_array, image); 
}


function display_recipe()
{
    let popup = document.createElement('div');
    let page = document.getElementById("html");
    popup.classList.add("popup_recipe");
    
    page.appendChild(popup)

    console.log("hey");

}
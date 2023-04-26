// let id  = "64361d7cd55f42890bfc8408"; 
let currURL = window.location.href; //Current URL 
let splitURL = currURL.split("?="); //Split by Query
let id = splitURL[1]; //User ID


let display_area = document.getElementById("display-recipes");
let body = document.getElementById("body");
let html = document.getElementById("html");
let searchbar = document.getElementById("search-item");
let initial = true;
let currentRecipe;

let toggle_screen = "";
let all_recipes = [];
let personal_recipes = [];
let newImage;
let recipe_template = document.getElementById("create_recipe");


display_user();
search();
setInterval(popup_open, 1);//Check if popup is open or closed

//Gets opening screen
if(initial)
{
    toggle_screen = "personal";
    getPersonalRecipes();
}

//Displays the username
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


//Toggles between personal and feed pages
function toggle(button_id)
{
    toggle_screen = button_id;
    initial =false;
    let button =  document.getElementById(button_id);

    let feed = document.getElementById("feed");
    let personal = document.getElementById("personal");


    button.style.opacity = 1;
    button.style.textDecoration = "underline";
    button.style.textShadow = "white .3vh .2vh";
    searchbar.value = "";

    if(button_id === "personal")
    {
        display_area.style.backgroundColor = "#b3cee5";
        feed.style.opacity = .5;
        feed.style.textDecoration = "none";
        feed.style.textShadow = "none"
        display_area.innerHTML = "";
        display_area.append(recipe_template);
        getPersonalRecipes();
    }
    else //if in feed
    {
        display_area.style.backgroundColor = "#b3cee5";
        personal.style.opacity = .5;
        personal.style.textShadow = "none"
        personal.style.textDecoration = "none";
        display_area.innerHTML = "";
        display_area.append(recipe_template);
        getFeedRecipes();
    }
}

//retrieves personal recipes
function getPersonalRecipes()
{
    var request = new XMLHttpRequest();
    var requestURL = 'http://localhost:3001/users/'+id+'/recipes';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        personal_recipes = request.response;
        displayPersonalRecipes(personal_recipes);
    }
}

//retreives feed recipes
function getFeedRecipes()
{
    var request = new XMLHttpRequest();
    var requestURL = 'http://localhost:3001/recipes';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        all_recipes = request.response;
        displayPersonalRecipes(all_recipes);
    }
}


//Called by GetPersonalRecipes, displays recipes
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

        let button = document.createElement('button');
        button.setAttribute("onclick", "display_recipe(\""+ chef + "\",\""+ dishName + "\",\""+ servingSize + "\",\""+ directions_array + "\",\""+ ingredients_array + "\",\""+ image + "\")"); //,\""+ directions_array + "\",\""+ ingredients_array + "\"
        button.classList.add("recipe_button");
        
        recipeDiv.style.backgroundImage = "url(\""+ image + "\")";


        button.innerHTML = dishName;
        recipeDiv.appendChild(button);
        display_area.appendChild(recipeDiv);
    }
}


//If a recipes is clicked it is displayed in a popup screen that this function creates
function display_recipe(chef, dishName, servingSize, directions_array, ingredients_array,image) //, directions_array ,ingredients_array,
{
    if(currentRecipe === undefined)
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


        currentRecipe = popup;
    }
}

function hideRecipe()
{
    currentRecipe.style.visibility = "hidden";
    currentRecipe = undefined;
}

                        //find (Query selector)
function popup_open()  //Look at level of depth (onclick element target) Look at whole tree (Check for model or child of model)
{
    if(currentRecipe != undefined)
    {
        disableScroll();
        body.setAttribute("onclick",  "hideRecipe()");
      
       
    }
    else
    {
       enableScroll();
       body.removeAttribute("onclick",  "hideRecipe()");
    }
}

function openCreateRecipePage()
{
    listenforphotos();
    setTimeout(() => {

        if(isNotHidden(recipe_template))
        {
            document.addEventListener('click', function handleClickOutsideBox(event) {
                // 👇️ the element the user clicked
                if(!recipe_template.contains(event.target))
                {
                        recipe_template.style.visibility = "hidden";
                    document.removeEventListener("click", handleClickOutsideBox);
                }
            });
        }

    }, 1);

    recipe_template.style.visibility = "visible";
    disableScroll();
}

function listenforphotos()
{
    let inputDiv = document.getElementById("photo_input-div");
    let displayImage = document.getElementById("added_picture");
    let imgURL = ""

   
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
      });

    inputDiv.addEventListener("drop", (e) => 
    {
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files[0].type.match("image"))
        {
            const newImage = files[0];
            imgURL = URL.createObjectURL(newImage);
            displayImage.setAttribute("src", imgURL);
        }
    })
}

function createRecipe()
{
    
    let newChef =  document.getElementById("chef_input").value;                  
    let newDishName = document.getElementById("dish_input").value;
    let newServingSize = document.getElementById("serving_input").value;
    
    let newDirections_array = [];
    newDirections_array[0] = document.getElementById("directions_input").value;
    
    let newIngredients_array = [];
    newIngredients_array[0] = document.getElementById("ingredients_input").value;

    let newDisplayImage = document.getElementById("added_picture");

    let newImage = document.getElementById("added_img").value;
    
    //let newImage = newDisplayImage.src;
    
    if(newDishName.length === 0 || newServingSize.length === 0 || newDirections_array[0].length === 0
        || newIngredients_array[0].length === 0 || newImage.length === 0)
    {
        console.log(newDishName.length === 0);
        console.log(newServingSize.length === 0);
        console.log(newDirections_array[0].length === 0);
        console.log(newIngredients_array[0].length === 0);
        console.log(newImage.length === 0);
    }
    else
    {
        const makeRecipe = async () =>
        {
            let queryURL = "http://localhost:3001/users/"+id+"/recipes/new";
            const recipe = await fetch(queryURL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dishName: newDishName,
                    servingSize: newServingSize,
                    ingredients: newIngredients_array,
                    directions:newDirections_array,
                    imageURL: newImage
                })
            }).then(res => res.json())
                .then(data => console.log(data));
        }
        makeRecipe();
        location.reload();
        recipe_template.style.visibility = "hidden";
        enableScroll();
        //invalid
    }
}


function search()
{
    searchbar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
       
            if(toggle_screen === "personal")
            {
                const filteredRecipes = personal_recipes.filter((recipe) => {
                        return (
                            recipe.dishName.toLowerCase().includes(searchString)
                        );   //Could add style of cousine
                });

                if(filteredRecipes != [])
                {
                    display_area.innerHTML = "";
                    display_area.append(recipe_template);
                    displayPersonalRecipes(filteredRecipes);
                }
            }
            else //if in feed
            {
                const filteredRecipes = all_recipes.filter((recipe) => {
                    return (
                        recipe.dishName.toLowerCase().includes(searchString)
                    );   //Could add style of cousine
            });

                if(filteredRecipes != [])
                {
                    display_area.innerHTML = "";
                    display_area.append(recipe_template);
                    displayPersonalRecipes(filteredRecipes);
                }
           
            }
    });
}



//Cannot scroll in main page while popup is open
function disableScroll() {
    // Get the current page scroll position in the vertical direction
   scrollTop =
       window.pageYOffset || document.documentElement.scrollTop;
        
        
// Get the current page scroll position in the horizontal direction 

 scrollLeft =
   window.pageXOffset || document.documentElement.scrollLeft;
   
   
  // if any scroll is attempted,
 // set this to the previous value
 window.onscroll = function() {
  window.scrollTo(scrollLeft, scrollTop);
 };
}

//Reenables scrolling
function enableScroll() 
{
     window.onscroll = function() {};
}

function isInPage(node) {
    return node === document.body ? false : document.body.contains(node);
  }


  function isNotHidden(el) 
  {
    var style = window.getComputedStyle(el);
    return (style.visibility != 'hidden')
}
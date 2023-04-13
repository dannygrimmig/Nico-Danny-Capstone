
function toggle(button_id)
{
    let display_recipes = document.getElementById("display-recipes");
    let button =  document.getElementById(button_id);

    let feed = document.getElementById("feed");
    let personal = document.getElementById("personal");


    button.style.opacity = 1;
    button.style.textDecoration = "underline";

    if(button_id === "personal")
    {
        display_recipes.style.backgroundColor = "blue";
        feed.style.opacity = .5;
        feed.style.textDecoration = "none";
    }
    else //if in feed
    {
        display_recipes.style.backgroundColor = "white";
        personal.style.opacity = .5;
        personal.style.textDecoration = "none";
    }
    
}
const appId="31be3099";
const appKey="74357a351366e2de882869b7ad78f4d1";
const baseUrl=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer=document.querySelector("#recipe-container");
const txtSearch=document.querySelector("#txtSearch");
const btnFind= document.querySelector(".btn");

btnFind.addEventListener("click",()=>loadRecipies(txtSearch.value))

txtSearch.addEventListener("keyup",function (e) {
    const inputVal=txtSearch.value;
        if (e.keyCode === 13) {
            loadRecipies(inputVal)
        }
    })

const setScrollPosition =() =>{
    recipeContainer.scrollTo({top:0,behavior:"smooth"});
};

function loadRecipies(type="paneer"){
    const url = baseUrl + `&q=${type}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => renderRecipies(data.hits))
        .catch(error=>console.log(error))
    .finally(() => setScrollPosition())
}
loadRecipies();

const getRecipeStepsStr=(ingredientLines = []) => {
    let str = "";
    for (var step of ingredientLines){
        str=str+`<li>${step}</li>`;
    }
    return str;
};

const renderRecipies = (recipeList = []) => {
    recipeContainer.innerHTML=";"
    recipeList.forEach((recipeObj) => {
        const {
            label: recipeTitle,
            ingredientLines,
            image: recipeImage,
        }=recipeObj.recipe; 
        const recipeStepsStr=getRecipeStepsStr(ingredientLines)
        const htmlStr = `  <div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image">
            <img src="${recipeImage}" />
        </div>
        <div class="recipe-text">
            <ul>${recipeStepsStr}</ul>
        </div>
      </div>`;
      recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    });
};
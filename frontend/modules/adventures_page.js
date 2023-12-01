
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search);
  const param= new URLSearchParams(search);
  let params=param.get('city');
  // console.log(params);
  return params;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let url=await fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
    let urljson= await url.json();
    console.log(typeof(urljson));
    return urljson;  
  } catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(({id,category,image,name,costPerHead,duration})=>{
    const ele=document.createElement("div");
    ele.className="col-6 col-lg-3 mb-4";
    ele.innerHTML=`<a href="detail/?adventure=${id}" id=${id}>
                   <div class="activity-card">
                   <div class="category-banner">${category}</div>
                   <img src=${image} class="img-responsive">
                   <div class="activity-card-text text-md-center w-100 mt-3 px-2">
                   <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                   <h5 class="text-left">${name}</h5>
                   <p>${costPerHead}</p>
                   </div>
                   <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                   <h5 class="text-left">Duration</h5>
                   <p>${duration}</p>
                   </div>
                   </div>
                   </div>
                   </a>`

     document.getElementById("data").appendChild(ele);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterlist=[];
  list.filter((key)=>{
    if(key.duration>low && key.duration<=high)
    filterlist.push(key);
  });

  console.log(filterlist);
  return filterlist
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(list);
  // console.log(categoryList);
  
  let filterlist=[];
  categoryList.forEach((category)=>{
    list.forEach((key)=>{
     if(key.category===category)
     filterlist.push(key)
    })
  })
  // console.log(filterlist);
  return filterlist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filterlist=[];
// console.log(filters["category"]);

if (filters["duration"].length>0 && filters["category"].length>0)
{
  let choice=filters["duration"].split("-");
  //console.log(choice);
  filterlist=filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
  console.log("list after selecting duration",filterlist)
  filterlist=filterByCategory(filterlist,filters["category"]);
  console.log("list after selecting category",filterlist);
}


else if(filters["duration"].length===0 && filters["category"].length>0){
    filterlist=filterByCategory(list,filters["category"]);
  }

else if(filters["duration"].length>0 && filters["category"].length===0){
    let choice=filters["duration"].split("-");
    console.log(choice);
    filterlist=filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
  }

  else {
    filterlist=list;
    return filterlist;
  }
  return filterlist;
  // Place holder for functionality to work in the Stubs

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
 localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  filters["category"].forEach((key)=>{
    let element=document.createElement("div");
    element.className="category-filter";
    element.innerHTML=`<div>${key}</div>`;
    document.getElementById("category-list").appendChild(element);
  });  
};

export{
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM
  
}

import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  if (search && search.includes("adventure=")) {
    const searchParams = search.split("=");
    if (searchParams.length === 2) {
      return searchParams[1];
  }
   }
     // Place holder for functionality to work in the Stubs
     return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url=await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`)
    
    let urljson= await url.json();
    // console.log(typeof(urljson));
    return urljson;  
  } catch(err){
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
    document.getElementById("adventure-name").innerHTML=`${adventure.name}`;
    document.getElementById("adventure-content").innerHTML=`${adventure.content}`;
    document.getElementById("adventure-subtitle").innerHTML=`${adventure.subtitle}`;
    let images=adventure.images;
    //console.log(images.length); 
    const img=document.createElement("div");
    // img.className="activity-card-image";
    img.innerHTML=``;
    for( let i=0;i<images.length;i++)
    {
      img.innerHTML+=`<img src=${images[i]} class="img-responsive activity-card-image">`;
      document.getElementById("photo-gallery").appendChild(img);
    }
    
    
    
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="carousel-inner"></div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;

{/* <div class="carousel-item active">
    <img src="..." class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="..." class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="..." class="d-block w-100" alt="...">
  </div> */}

images.map((obj,index)=>{
  const ele=document.createElement("div");
  ele.className=`carousel-item ${index ===0?'active' : ''}`
  ele.innerHTML=`<img src=${obj} ">`;
  document.getElementById("carousel-inner").appendChild(ele);
})



}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let sold=document.getElementById("reservation-panel-sold-out");
  let reserve=document.getElementById("reservation-panel-available");
  if(adventure.available===true)
  {
    sold.style.display="none";
    reserve.style.display="block";
    document.getElementById("reservation-person-cost").innerHTML=`${adventure.costPerHead}`;
  }

  else{
    sold.style.display="block";
    reserve.style.display="none";
  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cph=adventure.costPerHead;
  let total=cph*persons;
  document.getElementById("reservation-cost").innerHTML=`${total}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

 let form= document.getElementById("myForm");
 form. addEventListener("submit",async(event)=>{
  event.preventDefault();
  let url=config.backendEndpoint +"/reservations/new";
  let forElements=form.elements;
  let bodystring=JSON.stringify({
    name:forElements["name"].value,
    date:forElements["date"].value,
    person:forElements["person"].value,
    adventure:adventure.id
  });
  try{
    let res= await fetch(url,{
      method:"POST",
      body:bodystring,
      headers:{
        "Content-Type":"application/json"
      }
    });
      if(res.ok){
        alert("Success!");
        window.location.reload;
      }
      else{
        let data=await res.json();
        alert("Failed!- ",data.message);
      }  
  } catch(err){
    return null;
  }
 })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved===true)
  {
    document.getElementById("reserved-banner").style.display="block";
  }
  else 
  {
    document.getElementById("reserved-banner").style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

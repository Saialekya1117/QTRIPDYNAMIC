import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let data= await fetch(`${config.backendEndpoint}/reservations`);
    console.log(data);
    let res=await data.json();
    // Place holder for functionality to work in the Stubs
    console.log(`res=${res}`);
    return res;
  }catch(err){
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations.length>0)
 {
  document.getElementById("no-reservation-banner").style.display="none";
  document.getElementById("reservation-table-parent").style.display="block";
 }
 
 else {
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
 }
reservations.map((elem,index)=>{
  const ele=document.createElement("tr");
  ele.innerHTML=`
  <th scope="row">${elem.id}</th>
  <td>${elem.name}</td>
  <td>${elem.adventureName}</td>
  <td>${elem.person}</td>
  <td>${new Date(elem.date).toLocaleDateString("en-IN")}</td>
  <td>${elem.price}</td>
  <td>${new Date(elem.time).toLocaleString("en-IN",{
    day:"numeric",
    year:"numeric",
    month:"long",
    hour:"numeric",
    minute:"numeric",
    second:"numeric",
    hour12:true 
  }).split(" at").join(",")}</td>
  <td style="display:flex gap:5px">
  <div class="reservation-visit-button" id=${elem.id}>
  <a href="../detail/?adventure=${elem.adventure}">
  Visit Adventure</a>
  </div>
  <div class="reservation-cancel-button" id=${elem.id}>Cancel Adventure</div>
</td>`;
document.getElementById("reservation-table").append(ele);
});

}

export { fetchReservations, addReservationToTable };

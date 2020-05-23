const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');//it's like making an array of seats
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();

let ticketPrice = +movieSelect.value; //+ makes it integer

//update selected count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');


  // to save data to local storage 1-copy selected seat in an array 2- map through the array // return a new array indexes and we will use spread syntax for that

  // const seatsIndex = [...selectedSeats].map(function(seat){
  //   return [...seats].indexOf(seat)
  // }); refactored below--------
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  console.log(seatsIndex);
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice
}

//get the data from local storage and pare it back
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  if(selectedSeats !==null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null ) {
    movieSelect.selectIndex = selectedMovieIndex;
  }
};


//save selected movie index and price 
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectMovieIndex', movieIndex);
  localStorage.setItem('selectMoviePrice', moviePrice);

}
// movie select event
movieSelect.addEventListener('change',(e)=>{
ticketPrice = +e.target.value;//+ to make in integer
 setMovieData(e.target.selectedIndex, e.target.value);
updateSelectedCount();

});



//seat click event
container.addEventListener('click', (e) =>{//anywhere in eventListener(container ) I click will be choose
  if(e.target.classList.contains('seat') && 
  !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');

    updateSelectedCount();
    
  }
});

//Initial count and total set 
updateSelectedCount();

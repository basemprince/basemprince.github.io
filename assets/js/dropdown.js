//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var dropdown_c = document.getElementsByTagName("a");


// if a dropdown menu is clicked -> if closed, open it -> if already opened, then close it
$(dropdown).click(function() {
  if ($(this)[0].nextElementSibling.style.display == "block"){
    $(this)[0].nextElementSibling.style.display = "none"
    $(this)[0].style.background = "";
  }
  else{
    $(this)[0].nextElementSibling.style.display = "block";
    $(this)[0].style.background = "#84860abd";
  }
});

// to check for all clicks outside all elements
function outsideClick(event, notelem)	{
  notelem = $(notelem); // jquerize (optional)
  // check outside click for multiple elements
  var clickedOut = true, i, len = notelem.length;
  for (i = 0;i < len;i++)  {
      if (event.target == notelem[i] || notelem[i].contains(event.target)) {
          clickedOut = false;
      }
  }
  if (clickedOut) return true;
  else return false;
}

// listens for clicks on the document -> if outside of all elements, close all dropdown menus
 document.addEventListener('click', function(event) {
  if (outsideClick(event, dropdown) && outsideClick(event,dropdown_c)) {
    console.log("activated");
    for (j = 0; j < dropdown.length; j++) {
          dropdown[j].nextElementSibling.style.display = "none"
          dropdown[j].style.background = "";
    }
}
});

 var slideIndex = 1;
 showDivs(slideIndex);
 
 function plusDivs(n) {
   showDivs(slideIndex += n);
 }
 



 function showDivs(n) {
   var i;
   var x = document.getElementsByClassName("mySlides");

   if (n > x.length) {slideIndex = 1}
   if (n < 1) {slideIndex = x.length} ;
   for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
   }
   x[slideIndex-1].style.display = "block";
  }


  var slideIndex1 = 1;
  showDivs1(slideIndex1);
  
  function plusDivs1(n) {
    showDivs1(slideIndex1 += n);
  }

  function showDivs1(n) {
   var j;
   var y = document.getElementsByClassName("mySlides2")

   if (n > y.length) {slideIndex1 = 1}
   if (n < 1) {slideIndex1 = y.length} ;
   for (j = 0; j < y.length; j++) {
     y[j].style.display = "none";
   }
   y[slideIndex1-1].style.display = "block";

 }



 var slideIndex2 = 1;
 showDivs2(slideIndex2);
 
 function plusDivs2(n) {
   showDivs2(slideIndex2 += n);
 }

 function showDivs2(n) {
  var k;
  var z = document.getElementsByClassName("mySlides3")

  if (n > z.length) {slideIndex2 = 1}
  if (n < 1) {slideIndex2 = z.length} ;
  for (k = 0; k < z.length; k++) {
    z[k].style.display = "none";
  }
  z[slideIndex2-1].style.display = "block";

}
 
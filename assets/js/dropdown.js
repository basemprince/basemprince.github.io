//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");

var i;
var j;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {  
      
      for (j = 0; j < dropdown.length; j++) {
        if (i!== j){
            //  dropdown[j].nextElementSibling.style.display = "none"
        }
        
      }
      dropdownContent.style.display = "block";

    }
  });
}

const $menu = $('nav.use-middle');
const $article_open = $('is-article-visible')

$(document).mouseup(e => {
   if (!$menu.is(e.target) // if the target of the click isn't the container...
   && $menu.has(e.target).length === 0 // ... nor a descendant of the container
   && !$article_open.is(e.target)
)
   {
    for (j = 0; j < dropdown.length; j++) {
      // if (i!== j){
          dropdown[j].nextElementSibling.style.display = "none"
      // }
      
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
 
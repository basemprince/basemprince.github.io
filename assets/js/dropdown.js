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
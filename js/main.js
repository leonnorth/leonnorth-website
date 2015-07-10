//collapse the nav bar when something is clicked or mouse out.
$(document).ready(function () {
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
  $(".navbar-nav").mouseleave(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
});
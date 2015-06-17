$(document).ready(function(){
  $('#togglebtn').click(function () {
    if ($('.toggle > .sidebar').is(":visible") === true) {
      $('#maincontent_wrapper').css({
        'margin-left': '-210px'
      });
      $('.sidebar').css({
        'margin-left': '-210px'
      });
      $('.toggle > .sidebar').slideUp("slow");
      $("#container").addClass("sidebar-closed");
    } else {
      $('#maincontent_wrapper').css({
        'margin-left': '0px'
      });
      $('.sidebar').css({
        'margin-left': '0'
      });
      $('.toggle > .sidebar').slideDown("slow");
      $("#container").removeClass("sidebar-closed");
    }
  });
});
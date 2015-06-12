$(document).ready(function(){
  $('#togglebtn').click(function () {
    if ($('.toggle > .sidebar').is(":visible") === true) {
      $('#maincontent_wrapper').css({
        'margin-left': '-210px'
      });
      $('.sidebar').css({
        'margin-left': '-210px'
      });
      $('.toggle > .sidebar').hide(300);
      $("#container").addClass("sidebar-closed");
    } else {
      $('#maincontent_wrapper').css({
        'margin-left': '0px'
      });
      $('.sidebar').css({
        'margin-left': '0'
      });
      $('.toggle > .sidebar').show(300);
      $("#container").removeClass("sidebar-closed");
    }
  });
});
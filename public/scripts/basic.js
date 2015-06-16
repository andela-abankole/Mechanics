$(document).ready(function(){ 
  $("b").keypress(function(){
    $("#searchmechcollection").css({
      'display': 'block'
    })
  });
  $('.tooltipped').tooltip({delay: 20});
});
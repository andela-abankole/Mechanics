$(document).ready(function(){
  if($("#searchinput").is (":visible") === false) { 
    $( "#activesearch" ).click(function() {
      $("#searchinput" ).show( "slow" );
      $("#mechcollection").hide(300);
    });
  }
  else {
    $("#mechcollection").show( "slow" );
    $("searchinput").hide(300);
  };

  if($("#mechcollection").is (":visible") === true) { 
    $( "#activemechanics" ).click(function() {
      $("#searchinput" ).hide( "slow" );
      $("#mechcollection").show(300);
    });
  }
  else {
    $("#mechcollection").hide( "slow" );
    $("searchinput").show(300);
  }
});
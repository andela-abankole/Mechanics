$(document).ready(function(){
  if($("#searchinput").is (":visible") === false) { 
    $( "#activesearch" ).click(function() {
      $("#searchinput" ).show( "slow" );
      $("#searchinput" ).focus();
      $("#mechcollection").hide();
      $("#landing-searchmech").css({
        'display': 'block',
        'opacity': '.09'
      });
    });
  }
  else {
    $("#mechcollection").show( "slow" );
    $("#searchinput").hide(300);
  };

  $("b").keypress(function(){
    $("#landing-searchmech").css({
      'opacity': '1'
    })
  });

  if($("#mechcollection").is (":visible") === true) { 
    $( "#activemechanics" ).click(function() {
      $("#searchinput" ).hide( "slow" );
      $("#mechcollection").show(300);
      $("#landing-searchmech").hide();
    });
  }
  else {
    $("#mechcollection").hide( "slow" );
    $("#searchinput").show(300);
  };
});
$(document).ready(function(){
  $("#mechcollection").css({
    'display': 'none'
  });
  $("#about").slideDown( 800 )
  $("#button").click(function() {
    $("#about").fadeOut(300).delay(800);
    $("#mechcollection").show();
  });

  if($("#searchinput").is (":visible") === false) { 
      $("#activesearch").click(function() {
        $("#searchinput").show( "slow" );
        $("#searchinput").focus();
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

  if($("#mechcollection").is (":visible") === false) { 
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
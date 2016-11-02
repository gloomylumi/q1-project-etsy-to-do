"use strict";
$( document ).ready(
  function() {
    console.log( "ready" );

    // **** EVENT LISTENERS ****
    $( "#lulzButton" ).click( lulzButtonClicked );
    // **** FUNCTIONS ****
    function lulzButtonClicked() {
      isCardPanelHidden();
      $.ajax( {
          url: "http://api.icndb.com/jokes/random",
          data: {
            escape: "javascript"
          },
          type: "GET",
          dataType: "json",
        } )
        .done( function( json ) {
          $( "#cardPanel" ).text( json.value.joke );
        } )
        .fail( function( xhr, status, errorThrown ) {
          console.log( "Sorry, there was a problem!" );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        } )
        .always( function( xhr, status ) {
          console.log( "The request is complete!" );
        } );
    }

    function isCardPanelHidden() {
      if ( $( "#contentPanel" ).hasClass( "hidden" ) ) {
        $( "#contentPanel" ).removeClass( "hidden" );
      }
      return;
    }




  } );

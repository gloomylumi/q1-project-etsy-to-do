"use strict";
$( document ).ready(
  function() {
    console.log( "ready" );

    // **** EVENT LISTENERS ****
    $( "#lulzButton" ).click( lulzButtonClicked );
    $( "#inspiredButton" ).click( inspiredButtonClicked );
    // **** FUNCTIONS ****
    function lulzButtonClicked() {
      prepContentPanel();
      $.ajax( {
          url: "http://api.icndb.com/jokes/random",
          data: {
            escape: "javascript"
          },
          type: "GET",
          dataType: "json",
        } )
        .done( function( json ) {
          console.log( "Lulz: success" );
          console.log( $( "#contentPanel" ).text( json.value.joke ) );
          $( "#contentPanel" ).text( json.value.joke );
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

    function inspiredButtonClicked() {
      prepContentPanel();
      $.ajax( {
          url: " http://g-forismatic.herokuapp.com/api/1.0/?method=getQuote&format=json&lang=en"
        } )
        .done( function( json ) {
          var quote = document.createElement( "p" );
          var author = document.createElement( 'p' );
          $( quote ).addClass( "quote" );
          $( author ).addClass( "author" );
          $( quote ).text( json.quoteText ).appendTo( "#contentPanel" );
          console.log( $( quote ).text );
          $( author ).text( json.quoteAuthor ).appendTo( "#contentPanel" );
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


    function prepContentPanel() {
      if ( $( "#contentPanel" ).hasClass( "hidden" ) ) {
        // unhide the contentPanel if it is hidden
        $( "#contentPanel" ).removeClass( "hidden" );
      }
      // clear any existing content from the content panel
      $( "#contentPanel" ).html( '' );
      return;
    }




  } );

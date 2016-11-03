"use strict";
$( document ).ready(
  function() {
    console.log( "ready" );

    // **** EVENT LISTENERS ****
    $( "#lulzButton" ).click( lulzButtonClicked );
    $( "#inspiredButton" ).click( inspiredButtonClicked );
    $( "#allFeelsButton" ).click( allTheFeelsClicked );
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
      $.ajax( {
          url: " http://g-forismatic.herokuapp.com/api/1.0/?method=getQuote&format=json&lang=en"
        } )
        .done( function( json ) {
          prepContentPanel();
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

    function allTheFeelsClicked() {
      var randomLinecount = randomIntegerGenerator( 5, 38 );
      var randomLinecountRequest = ( "http://poetdb.herokuapp.com/linecount/" + randomLinecount + ":abs" );
      $.ajax( {
          url: randomLinecountRequest
        } )
        .done( function( json ) {
          prepContentPanel();
          var indexRand = randomIntegerGenerator( 0, json.length );
          var randomPoem = json[ indexRand ];
          var poemString = randomPoem.lines.join( '<br>' );
          appendNewContent( "p", randomPoem.title, "poemTitle" );
          appendNewContent( "p", randomPoem.author, "poemAuthor" );
          appendNewContent( "p", poemString, "poemLines" );

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

    function randomIntegerGenerator( min, max ) {
      return Math.floor( Math.random() * ( max - min ) + min );
    }

    function appendNewContent( elementTag, jsonText, newClass ) {
      // *arguments format* elementTag: "p", jsonText: jsonObj.value, newClass: "cssClass"
      var newElement = document.createElement( elementTag );
      $( newElement ).addClass( newClass );
      $( newElement ).html( jsonText ).appendTo( "#contentPanel" );
      return;
    }



  } );

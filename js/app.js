"use strict";
$( document ).ready(
  function() {
    console.log( "ready" );

    // **** EVENT LISTENERS ****
    $( "#lulzButton" ).click( lulzButtonClicked );
    $( "#inspiredButton" ).click( inspiredButtonClicked );
    $( "#allFeelsButton" ).click( allTheFeelsClicked );
    $( ".feels-button" ).one( "click", downsizeGimme );
    // **** FUNCTIONS ****
    function lulzButtonClicked() {
      $( "#contentPanel" ).slideUp( 280 );
      $.ajax( {
          url: "http://api.icndb.com/jokes/random",
          data: {
            escape: "javascript"
          },
          type: "GET",
          dataType: "json",
        } )
        .done( function( json ) {

          $( "#contentPanel" ).html( '' );
          appendNewContent( "p", json.value.joke, "jokeText" );
          prepContentPanel();
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
      $( "#contentPanel" ).slideUp( 280 );
      $.ajax( {
          url: " http://g-forismatic.herokuapp.com/api/1.0/?method=getQuote&format=json&lang=en"
        } )
        .done( function( json ) {
          $( "#contentPanel" ).html( '' );
          appendNewContent( "p", json.quoteText, "quote" );
          appendNewContent( "p", json.quoteAuthor, "author" );
          prepContentPanel();
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
      $( "#contentPanel" ).slideUp( 280 );
      var randomLinecount = randomIntegerGenerator( 5, 38 );
      var randomLinecountRequest = ( "http://poetdb.herokuapp.com/linecount/" + randomLinecount + ":abs" );
      $.ajax( {
          url: randomLinecountRequest
        } )
        .done( function( json ) {
          var indexRand = randomIntegerGenerator( 0, json.length );
          var randomPoem = json[ indexRand ];
          var poemString = randomPoem.lines.join( '<br>' );
          $( "#contentPanel" ).html( '' );
          appendNewContent( "p", randomPoem.title, "poemTitle" );
          appendNewContent( "p", randomPoem.author, "poemAuthor" );
          appendNewContent( "p", poemString, "poemLines" );
          prepContentPanel();

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
        $( "#contentPanel" ).slideDown().fadeIn( 'slow' );
        $( "#contentPanel" ).removeClass( "hidden" );
      }
      $( "#contentPanel" ).slideDown( 280 ).fadeIn( 'slow' );

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

    function downsizeGimme() {
      $( "#gimme" ).slideUp( 280 ).removeClass( "super-padding" ).addClass( "gimme-small" ).slideDown( 280 );
    }

    function requestFail( xhr, status, errorThrown ) {
      console.log( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    }


  } );

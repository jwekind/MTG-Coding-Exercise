$(document).ready(function() {
    //Global page position
    var currentPage = 0;

    loadCards(currentPage);

    function loadCards(){
        //Increments pages numbers
        currentPage ++;

        //Display loading message with rotating gif during asynchronous Ajax request
        jQuery.ajaxSetup({
            //Pre-request callback function used to modify object before sent
            beforeSend: function() {
                $('#loader').show();
            },
            //Function called when request is finished after 'success' callback is executed
            complete: function(){
                $('#loader').hide();
            },
            //Function called if request succeeds
            success: function() {}
        });


        //Load API and set first page (current page) to display 20 results. Further filter to display only creature cards , with images, sorted by name.
        $.getJSON('https://api.magicthegathering.io/v1/cards?page=' + currentPage + '&pageSize=20&contains=imageUrl&type=Creature&orderBy=name', function(data) {
            //Set array to loop through each card and log values
            $.each(data, function(index, value){
                //Declares variables and gets values
                value.forEach((card, index) => {
                    var imageUrl 		= card.imageUrl;
                    var name 			= card.name;
                    var artist			= card.artist;
                    var setName			= card.setName;
                    var originalType	= card.originalType;
                    var deckDiv			= ''  //declares empty decDiv var to store collected values

                    //Stored in loop to reset with each iteration of loop
                    deckDiv += '<div id="card_001" class="card">'
                    deckDiv += '	<img src="' + imageUrl + '" width=223 height=311>'
                    deckDiv += '	<div>Name: '			+ name 			+ '</div>'
                    deckDiv += '	<div>Artist: ' 			+ artist 		+ '</div>'
                    deckDiv += '	<div>Set Name: ' 		+ setName 		+ '</div>'
                    deckDiv += '	<div>Original Type: ' 	+ originalType 	+ '</div>'
                    deckDiv += '</div>'

                    //Outputs data to html. Appends div loop values
                    $('.deck').append(deckDiv);
                })
            });
        });
    }

    //Loads additional cards with scroll. At end of each scroll event an additional 20 cards are loaded till the end is reached. Number of cards per page determined by dimensions in css.
    $(window).scroll(function() {
        var deckHeight 	    = $('.deck').outerHeight();
        var scrollTop	    = $(window).scrollTop();
        var scrollBottom    = scrollTop + $(window).height();
        //console.log("test - " + deckHeight +  " - " + scrollTop + " - " + scrollBottom);

        if(scrollBottom > deckHeight){
            loadCards(currentPage);
        }
    });

});
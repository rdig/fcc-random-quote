(function() {

	let card = $('#card');
	let toggle = $('#toggle');
	let twitter = $('.twitter');
	let location = 'data/quotes.json';

	let counter = 180;

	let flipCard = function(e) {

		$(e.target).off('click');

		let translate = -100;
		let side = 'backside';

		if ((counter/180) % 2 === 0) {
			translate = 0;
			side = 'frontside'
		} else {
			translate = -100;
		}

		// Set new data
		card.setQuote(side, location);

		card.stop().css('transform', ' translateY(' + translate + '%) rotateX(' + counter + 'deg)');

		counter += 180;

		// Calm the flipper
		setTimeout(() => {
			$(e.target).on('click', flipCard);
		}, 800);

	};

	let getXHRQuotes = function(location, callback) {
		$.ajax({
			url: location,
			type: "GET",
			cache: false,
			success: function(data){
				callback(data);
			}
		});
	};

	$.fn.twitterShare = function (e, intWidth = 500, intHeight = 400, blnResize) {
		// Prevent default anchor event
		e.preventDefault();
		let strResize = (blnResize ? 'yes' : 'no');
		// Set title and open popup with focus on it
		let strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
		strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
		objWindow = window.open(this.attr('href'), strTitle, strParam).focus();

	};

	$.fn.setTweet = function(tweet) {
		let link = 'http://twitter.com/share?url=url&hashtags=freecodecamp&text=';
		link += encodeURI(tweet);
		this.attr('href', link);
	};

	$.fn.setQuote = function(face, ajaxLocation) {
		getXHRQuotes(ajaxLocation, function(data) {
			let random = Math.floor(Math.random() * data.length) + 0;
			this.children('.' + face).find('.quote').html(data[random].quote);
			this.children('.' + face).find('.author').html(data[random].author);
			this.children('.' + face).find('.twitter').setTweet(data[random].quote);
		}.bind(this));
	};

	// Set the initial quote
	card.setQuote('frontside', location);

	toggle.on('click', flipCard);

	twitter.on("click", function(e) {
		$(this).twitterShare(e);
	});

}());

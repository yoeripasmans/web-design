var scroll = new SmoothScroll('a[href*="#"]', {
	// Selectors
	ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
	header: 'header', // Selector for fixed headers (must be a valid CSS selector)

	// Speed & Easing
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
	easing: 'easeInOutCubic', // Easing pattern to use
	customEasing: function(time) {

		// Function. Custom easing pattern
		// If this is set to anything other than null, will override the easing option above

		// return <your formulate with time as a multiplier>

		// Example: easeInOut Quad
		return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

	},

	// Callback API
	before: function(anchor, toggle) {}, // Callback to run before scroll
	after: function(anchor, toggle) {} // Callback to run after scroll
});

window.sr = ScrollReveal();
var nodeList = document.querySelectorAll('.content');
sr.reveal(nodeList);

// var navItems = document.querySelectorAll('.main-nav ul li');
// for (var i = 0; i < navItems.length; i++) {
// 	if (navItems[i].classList.contain('active')) {
// 		navItems[i].addEventListener('click', toggleActive);
// 	}
// }
//
//
// function toggleActive(e) {
// 	console.log(navItems[i]);
// 	// if (this.classList.contain('active')) {
// 		this.classList.add('active');
// 	// } else {
// 	//
// 	// }
// }

if(!document.querySelector('.detail')){
	window.onscroll = onScroll;
}


function onScroll() {
	var removeActiveClass = function(elements) {
		for (var i = 0; i < elements.length; ++i) {
			elements[i].classList.remove('active');
		}
	};
	var anchors = document.querySelectorAll('.main-nav a');
	var previousRefElement = null;
	for (var i = 0; i < anchors.length; ++i) {
		// Get the current element by the id from the anchor's href.
		var currentRefElement = document.getElementById(anchors[i].getAttribute('href').substring(1));
		var currentRefElementTop = (currentRefElement.getBoundingClientRect().top - 70);
		// Searching for the element whose top haven't left the top of the browser.
		if (currentRefElementTop <= 0) {
			//The browser's top line haven't reached the current element, so the previous element is the one we currently look at.
			previousRefElement = anchors[i];
			// Edge case for last element.
			if (i == anchors.length - 1) {
				removeActiveClass(anchors);
				anchors[i].classList.add("active");
			}
		} else {
			removeActiveClass(anchors);
			previousRefElement.classList.add("active");
			break;
		}

	}
}

// JavaScript for label effects only
// $(window).load(function(){
// 	$(".col-3 input").val("");
//
// 	$(".input-effect input").focusout(function(){
// 		if($(this).val() != ""){
// 			$(this).addClass("has-content");
// 		}else{
// 			$(this).removeClass("has-content");
// 		}
// 	})
// });

window.addEventListener('load', function() {
	var inputWrapper = document.querySelectorAll('.input-wrapper');
	var input = document.querySelectorAll('.input-wrapper input');
	var textarea = document.querySelectorAll('.input-wrapper textarea');
	var textareaLabel = document.querySelector('.input-wrapper.message label');

	for (var i = 0; i < input.length; i++) {
		input[i].value = "";
		input[i].addEventListener('focusout', content);
	}

	for (i = 0; i < textarea.length; i++) {
		textarea[i].value = "";
		textarea[i].addEventListener('focus', contentfocus);
		textarea[i].addEventListener('focusout', contentarea);
	}

	function content() {
		if (this.value) {
			this.parentElement.classList.add('has-content');
		} else {
			this.parentElement.classList.remove('has-content');
		}
	}

	function contentarea() {
		if (this.value) {
			textareaLabel.classList.add('has-content');
			this.classList.add('has-content');
		} else {
			textareaLabel.classList.remove('has-content');
			this.classList.remove('has-content');
		}
	}
	function contentfocus() {
		textareaLabel.classList.add('has-content');
	}


});

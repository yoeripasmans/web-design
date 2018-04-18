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

window.onscroll = onScroll;

function onScroll() {
    var removeActiveClass = function (elements) {
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

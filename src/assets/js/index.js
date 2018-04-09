var gallery = {
	init: function() {

		var grid = document.querySelector('.grid');
		var gridItems = document.querySelectorAll('.grid-item');

		//Create gridsizer
		var gridSizer = document.createElement('div');
		gridSizer.classList.add("grid-sizer");
		grid.appendChild(gridSizer);

		for (let i = 0; i < gridItems.length; i++) {
			gridItems[i].addEventListener('click', function(e) {
				slider.open(i);
				e.preventDefault();
			});
		}

		var msnry = new Masonry(grid, {
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: 10,
			percentPosition: true,
			horizontalOrder: true
		});

		imagesLoaded(grid).on('progress', function() {
			// loader.show();
			msnry.layout();
		});
		imagesLoaded(grid).on('done', function() {
			// layout Masonry after each image loads
			// loader.hide();
		});

	}
};

var slider = {

	el: document.querySelector('.slider'),
	galleryImages: document.querySelectorAll('.gallery-img'),
	image: document.querySelector('.slider-img'),
	slidesLength: document.querySelectorAll('.gallery-img').length,
	nextButton: document.querySelector('.next-button'),
	prevButton: document.querySelector('.prev-button'),
	currentIndex: 0,

	init: function() {
		var _this = this;
		this.nextButton.addEventListener('click', function() {
			_this.nextSlide(_this);
		});
		this.prevButton.addEventListener('click', function() {
			_this.prevSlide(_this);
		});
	},

	open: function(clickedIndex) {
		this.el.classList.add('active');
		this.currentIndex = clickedIndex;
		this.image.src = this.galleryImages[this.currentIndex].src;
	},

	nextSlide: function(_this) {
		if (_this.currentIndex >= (_this.slidesLength - 1)) {
			_this.currentIndex = 0;
		} else {
			_this.currentIndex++;
		}
		_this.image.src = _this.galleryImages[_this.currentIndex].src;
	},

	prevSlide: function(_this) {
		if (_this.currentIndex > 0) {
			_this.currentIndex--;
		} else if(_this.currentIndex === 0){
			_this.currentIndex = (_this.slidesLength - 1);
		}

		_this.image.src = _this.galleryImages[_this.currentIndex].src;
	},


};

var api = {
	getData: function() {

		var apiKey = "zzk9ce3nsrs6y44wbv5w6usk";

		var appendApiKeyHeader = function(xhr) {
			xhr.setRequestHeader('Api-Key', apiKey);
		};

		fetch('https://connect.gettyimages.com/v3/search?phrase=dog', {
			method: 'GET',
			beforeSend: appendApiKeyHeader,
			headers: new Headers({
				'Api-Key': 'apiKey'
			})
		}).then(function(response) {
			return response.json();
		}).then(function(myJson) {
			console.log(myJson);
		});

	}
};

gallery.init();
slider.init();

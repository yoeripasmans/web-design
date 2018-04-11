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
	galleryItems: document.querySelectorAll('.grid-item'),
	image: document.querySelector('.slider-img'),
	title: document.querySelector('.slider-title'),
	// slidesLength: document.querySelectorAll('.gallery-img').length,
	nextButton: document.querySelector('.next-button'),
	prevButton: document.querySelector('.prev-button'),
	closeButton: document.querySelector('.close-button'),
	currentIndex: 0,

	init: function(imageData) {
		var _this = this;
		this.nextButton.addEventListener('click', function(e) {
			_this.nextSlide(_this);
			e.preventDefault();
			e.stopPropagation();
		});
		this.prevButton.addEventListener('click', function(e) {
			_this.prevSlide(_this);
			e.preventDefault();
			e.stopPropagation();
		});
		this.closeButton.addEventListener('click', function(e) {
			_this.close();
		});
		this.imageData = imageData;
		this.slidesLength = imageData.length;
	},

	open: function(clickedIndex) {
		this.el.classList.add('active');
		document.body.classList.add('noscroll');
		this.currentIndex = clickedIndex;

		this.image.src = this.imageData[this.currentIndex].urls.regular;
	},

	close: function() {
		this.el.classList.remove('active');
		document.body.classList.remove('noscroll');
	},

	nextSlide: function(_this) {
		if (_this.currentIndex >= (_this.slidesLength - 1)) {
			_this.currentIndex = 0;
		} else {
			_this.currentIndex++;
		}
		_this.image.src = _this.imageData[_this.currentIndex].urls.regular;
	},

	prevSlide: function(_this) {
		if (_this.currentIndex > 0) {
			_this.currentIndex--;
		} else if (_this.currentIndex === 0) {
			_this.currentIndex = (_this.slidesLength - 1);
		}
		_this.image.src = _this.imageData[_this.currentIndex].urls.regular;
	},


};

var api = {
	getimages: function() {
		fetch('https://api.unsplash.com/photos?page=1&per_page=30', {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Client-ID '+'780db5e9f6e858d86f7d3cb689167f1fae91566545f3baa4e58a8ce692e6d127',
			})
		}).then(function(response) {
			return response.json();
		}).then(function(imageData) {
			console.log(imageData);
			render.images(imageData);
		}).catch(function(error) {
			console.log(error);
		});

	}
};

var render = {
	images: function(imageData) {
		var grid = document.querySelector('.grid');

		for (var i = 0; i < imageData.length; ++i) {
			//Grid-items
			var item = document.createElement('a');
			item.href = '#';
			item.classList.add('grid-item');
			grid.appendChild(item);
			// Images
			var img = document.createElement('img');
			img.src = imageData[i].urls.regular;
			img.alt = imageData[i].title;
			item.appendChild(img);
			//Content
			var section = document.createElement('section');
			section.classList.add('gallery-content');
			item.appendChild(section);
			var title = document.createElement('h3');
			title.textContent = imageData[i].user.name;
			section.appendChild(title);

		}
		gallery.init();
		slider.init(imageData);
	}
};

api.getimages();

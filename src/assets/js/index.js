var gallery = {
	init: function() {

		var grid = document.querySelector('.grid');

		var msnry = new Masonry(grid, {
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: 10,
			percentPosition: true,
			horizontalOrder: true,
			visibleStyle: {
				transform: 'translateY(0)',
				opacity: 1
			},
			hiddenStyle: {
				transform: 'translateY(100px)',
				opacity: 0
			},
		});

		imagesLoaded(grid).on('progress', function() {

			msnry.layout();
		});
		imagesLoaded(grid).on('done', function() {
			// layout Masonry after each image loads
			infiniteScroll.init();
		});

	}
};

var slider = {

	el: document.querySelector('.slider'),
	galleryItems: document.querySelectorAll('.grid-item'),
	image: document.querySelector('.slider-img'),
	title: document.querySelector('.slider-title'),
	nextButton: document.querySelector('.next-button'),
	prevButton: document.querySelector('.prev-button'),
	closeButton: document.querySelector('.close-button'),
	currentIndex: 0,
	userImg: document.querySelector('.slider-profile-img'),
	userName: document.querySelector('.slider-user-name'),
	date: document.querySelector('.slider-date'),
	indexElement: document.querySelector('.img-index'),
	startButton: document.querySelector('.start-slideshow'),
	stopButton: document.querySelector('.stop-slideshow'),
	likeButton: document.querySelector('.like-amount'),

	init: function(imageData) {
		this.imageData = imageData;
		this.slidesLength = imageData.length;
	},

	events: function() {
		var _this = this;
		var sliderContent = document.querySelector('.slider-content');
		this.nextButton.addEventListener('click', function(e) {
			_this.nextSlide();
			e.preventDefault();
			e.stopPropagation();
		});
		this.prevButton.addEventListener('click', function(e) {
			_this.prevSlide();
			e.preventDefault();
			e.stopPropagation();
		});
		this.closeButton.addEventListener('click', function(e) {
			_this.close();
		});
		this.el.addEventListener('click', function(e) {
			if (!sliderContent.contains(e.target)) {
				_this.close();
				document.body.style.cursor = 'default';
			}
		});
		this.el.addEventListener('mouseover', function(e) {
			if (!sliderContent.contains(e.target)) {
				document.body.style.cursor = 'zoom-out';
			} else {
				document.body.style.cursor = 'default';
			}
		});

		window.addEventListener("keydown", function(e) {
			switch (e.key) {
				case 'ArrowRight':
					_this.nextSlide();
					break;
				case 'ArrowLeft':
					_this.prevSlide();
					break;
				case 'Escape':
					_this.close();
			}

		});
		this.startButton.addEventListener('click', _this.startSlideshow);
		this.stopButton.addEventListener('click', _this.stopSlideshow);
	},

	open: function(clickedIndex) {
		this.el.classList.add('active');
		document.body.classList.add('noscroll');
		this.currentIndex = clickedIndex;
		this.image.src = this.imageData[this.currentIndex].urls.regular;
		this.userImg.src = this.imageData[this.currentIndex].user.profile_image.small;
		this.userName.textContent = this.imageData[this.currentIndex].user.name;
		this.date.textContent = "Added on: " + this.imageData[this.currentIndex].created_at.slice(0, 10);
		this.indexElement.textContent = (this.currentIndex + 1) + "/" + this.slidesLength;
		this.likeButton.textContent = this.imageData[this.currentIndex].likes;
	},

	close: function() {
		this.el.classList.remove('active');
		document.body.classList.remove('noscroll');
		this.stopSlideshow();
	},

	nextSlide: function() {
		if (slider.currentIndex >= (slider.slidesLength - 1)) {
			slider.currentIndex = 0;
		} else {
			slider.currentIndex++;
		}
		slider.image.src = slider.imageData[slider.currentIndex].urls.regular;
		slider.userImg.src = slider.imageData[slider.currentIndex].user.profile_image.small;
		slider.userName.textContent = slider.imageData[slider.currentIndex].user.name;
		slider.date.textContent = "Added on: " + slider.imageData[slider.currentIndex].created_at.slice(0, 10);
		slider.indexElement.textContent = (slider.currentIndex + 1) + "/" + slider.slidesLength;
		slider.likeButton.textContent = slider.imageData[slider.currentIndex].likes;
	},

	prevSlide: function() {
		if (slider.currentIndex > 0) {
			slider.currentIndex--;
		} else if (slider.currentIndex === 0) {
			slider.currentIndex = (slider.slidesLength - 1);
		}
		slider.image.src = slider.imageData[slider.currentIndex].urls.regular;
		slider.userImg.src = slider.imageData[slider.currentIndex].user.profile_image.small;
		slider.userName.textContent = slider.imageData[slider.currentIndex].user.name;
		slider.date.textContent = "Added on: " + slider.imageData[slider.currentIndex].created_at.slice(0, 10);
		slider.indexElement.textContent = (slider.currentIndex + 1) + "/" + slider.slidesLength;
		slider.likeButton.textContent = slider.imageData[slider.currentIndex].likes;
	},

	startSlideshow: function() {
		slider.startButton.classList.add('hidden');
		slider.stopButton.classList.remove('hidden');
		slider.interval = setInterval(function() {
			slider.nextSlide();
		}, 6000);

	},
	stopSlideshow: function() {
		slider.startButton.classList.remove('hidden');
		slider.stopButton.classList.add('hidden');
		clearInterval(slider.interval);
	}


};

var api = {
	data: [],
	page: 1,
	getImages: function() {
		loader.show();
		var _this = this;
		fetch("https://api.unsplash.com/photos?page=" + _this.page + "&per_page=20", {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Client-ID ' + '780db5e9f6e858d86f7d3cb689167f1fae91566545f3baa4e58a8ce692e6d127',
			})
		}).then(function(response) {
			return response.json();
		}).then(function(imageData) {
			for (var i = 0; i < imageData.length; i++) {
				api.data.push(imageData[i]);
			}
			render.images(api.data);
			gallery.init();
			loader.hide();
			slider.init(api.data);
		}).catch(function(error) {
			console.log(error);
			loader.hide();
		});

	},
};

var render = {
	images: function(imageData) {

		var grid = document.querySelector('.grid');

		//Create gridsizer
		var gridSizer = document.createElement('div');
		gridSizer.classList.add("grid-sizer");
		grid.appendChild(gridSizer);

		for (let i = 0; i < imageData.length; ++i) {
			//Grid-items
			var item = document.createElement('a');
			item.href = '#';
			item.classList.add('grid-item');
			item.addEventListener('click', function(e) {
				slider.open(i);
				e.preventDefault();
			});
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

			var detailWrapper = document.createElement('div');
			detailWrapper.classList.add('detail-wrapper');
			section.appendChild(detailWrapper);

			var likeIcon = document.createElement('img');
			likeIcon.src = "assets/icons/heart.svg";
			likeIcon.classList.add('like-icon');
			section.appendChild(likeIcon);

			var textWrapper = document.createElement('div');
			textWrapper.classList.add('text-wrapper');
			detailWrapper.appendChild(textWrapper);

			var title = document.createElement('p');
			title.classList.add('user-name');
			title.textContent = imageData[i].user.name;
			textWrapper.appendChild(title);

			var date = document.createElement('p');
			date.classList.add('date');
			date.textContent = "Added on: " + imageData[i].created_at.slice(0, 10);
			textWrapper.appendChild(date);
		}
	}
};

var infiniteScroll = {
	init: function() {
		var grid = document.querySelector('.grid');
		var pageHeight = document.documentElement.clientHeight;
		var scrollPosition;
		var gridHeight = grid.offsetHeight;

		function scroll() {
			scrollPosition = window.pageYOffset;
			if ((gridHeight - pageHeight - scrollPosition) < 500) {
				api.page++;
				api.getImages();
				window.removeEventListener('scroll', scroll);

			}
		}

		window.addEventListener('scroll', scroll);

	},

};

var loader = {
	init: function() {
		//Create overlay
		var grid = document.querySelector('.grid');
		//Create loader div
		this.element = document.createElement("div");
		grid.appendChild(this.element);
		this.element.classList.add("loader");

	},
	show: function() {
		this.element.classList.add("active");
	},
	hide: function() {
		this.element.classList.remove("active");
	}

};

loader.init();
api.getImages();
slider.events();

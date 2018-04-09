var gallery = {
    init: function() {
        // vanilla JS
        // init with element

        var msnry = new Masonry('.grid', {
            itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
            gutter: 10,
            percentPosition: true,
            horizontalOrder: true
        });

        // imagesLoaded(grid).on('progress', function() {
        //   layout Masonry after each image loads
        //   loader.show();
        // 	msnry.layout();
        //
        // });
        // imagesLoaded(grid).on('done', function() {
        //   layout Masonry after each image loads
        //   loader.hide();
        //
        // });

    }
};

gallery.init();

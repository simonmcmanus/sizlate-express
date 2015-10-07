
var sizlate = require('sizlate');
var fs = require('fs');


exports.__express = function(filename, options, callback) {


	if(!options.settings['view engine'])  {
		options.settings['view engine'] = 'sizlate';
	}
	var selectors = options.selectors;
	var wait = false;
	var count = 0; // keep track of total number of callbacks to wait for
	var complete = 0; // completed callbacks count.
	for(var key in selectors) {
		if(selectors[key] && selectors[key].partial){// this is a partial.
			if(selectors[key].data && selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
				wait = true;
				count++;
				console.log(1,options.settings.views + '/partials/' + selectors[key].partial + '.'+ options.settings['view engine']);
				fs.readFile(options.settings.views + '/partials/' + selectors[key].partial + '.'+ options.settings['view engine'], 'utf8', function (key, err, data) {
					selectors[key] = sizlate.render(data, sizlate.classifyKeys(selectors[key].data, selectors[key]));	// adding and then stripping body tag for jsdom.
					complete++;
					if(complete === 1) {
						doRendering();
					}
				}.bind({}, key));
			}
		}
	}

	var doRendering = function() {
		if(options.layout) {
			fs.readFile(options.settings.views + '/' + options.layout + '.'+ options.settings['view engine'], 'utf8', function(error, template) {
				fs.readFile(filename, 'utf8', function(err,data){
				  if(err) {
				    console.error("Could not open file: %s", err);
				    process.exit(1);
				  }
				  var selectors = {};
				  selectors[options.container || '#container'] = data;
				  var markup = sizlate.render(template,  selectors) ;
				  callback(null, sizlate.render(markup, options.selectors));
				});
			});
		} else { // no layouts specified, just do the render.

			fs.readFile( filename, 'utf8', function(err,data){
			  if(err) {
			    console.error("Could not open file: %s", err);
			    process.exit(1);
			  }
			  callback(null, sizlate.render(data, options.selectors)	);
			});
		}
	}
	if(!wait) {
		doRendering();
	}
};

module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("countdown360.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.countdown360.js"],
				dest: "dist/jquery.countdown360.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// write bower.json
		writeBowerJson: {
		  options: {
		    bowerJsonTemplate: 'bower-template.json'
		  }
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.countdown360.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.countdown360.js"],
				dest: "dist/jquery.countdown360.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-write-bower-json");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "writeBowerJson", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};

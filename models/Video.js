var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Video Model
 * ==========
 */

var Video = new keystone.List('Video', {
	track: true
});

Video.add({
	title: { type: Types.Text, required: true, initial: true },
 	videoUrl: { type: Types.Text, required: true, initial: true },
 	image: { type: Types.LocalFile, dest: 'public/uploads' }
});


/**
 * Registration
 */

Video.defaultColumns = 'title';
Video.register();

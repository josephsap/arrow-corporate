var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Campaign Model
 * ==========
 */

var Events = new keystone.List('Event', {
	sortable: true,
  track: true
});

Events.add({
	title: { type: Types.Text, required: true, initial: true },
  excerpt: { type: Types.Text, required: true, initial: true  },
  image: { type: Types.LocalFile, dest: '/public/uploads' },
  type: { type: Types.Select, options: ['Campaign', 'Link'], required: true, initial: true },
  slug: { type: Types.Key, dependsOn: { type: 'Campaign'} },
  body: { type: Types.Textarea, dependsOn: { type: 'Campaign'} },
  videos: { type: Types.Relationship, ref: 'Video', many: true, dependsOn: { type: 'Campaign'} },
  link: {type: Types.Url, dependsOn: { type: 'Link'} }
});


/**
 * Registration
 */

Events.defaultColumns = 'title, excerpt, type';
Events.register();

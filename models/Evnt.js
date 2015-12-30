var keystone = require('keystone');
var Types = keystone.Field.Types;


var Evnts = new keystone.List('Evnts', {
	map: {name: 'title'},
	sortable: true,
  track: true
});

Evnts.add({
	title: { type: Types.Text, required: true, initial: true },
  excerpt: { type: Types.Text, required: true, initial: true  },
  image: { type: Types.LocalFile, dest: 'public/uploads' },
  type: { type: Types.Select, options: ['Campaign', 'Link'], required: true, initial: true },
  slug: { type: Types.Key, dependsOn: { type: 'Campaign'} },
  body: { type: Types.Textarea, dependsOn: { type: 'Campaign'} },
  videos: { type: Types.Relationship, ref: 'Video', many: true, dependsOn: { type: 'Campaign'} },
	v1: { type: Types.Relationship, ref: 'V', many: false, dependsOn: { type: 'Campaign'} },
	v2: { type: Types.Relationship, ref: 'V', many: false, dependsOn: { type: 'Campaign'} },
	v3: { type: Types.Relationship, ref: 'V', many: false, dependsOn: { type: 'Campaign'} },
  link: {type: Types.Url, dependsOn: { type: 'Link'} }
});


/**
 * Registration
 */

Evnts.defaultColumns = 'name, excerpt, type';
Evnts.register();

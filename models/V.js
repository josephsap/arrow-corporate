var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * V Model
 * ==========
 */

var V = new keystone.List('V', {
  sortable: true,
  track: true
});

V.add({
	title: { type: Types.Text, required: true, initial: true },
	excerpt: { type: Types.Text, required: true, initial: true  },
	image: { type: Types.LocalFile, dest: 'public/uploads' },
	slug: { type: Types.Key, unique: true},
	body: { type: Types.Html },
  v1: { type: Types.Relationship, ref: 'V'},
  v2: { type: Types.Relationship, ref: 'V' },
  v3: { type: Types.Relationship, ref: 'V' },
	color: { type: Types.Text, required: true, initial: true }
});


/**
 * Registration
 */

V.defaultColumns = 'title, excerpt';
V.register();

/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

(function(OCA, OC, Backbone) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Models = OCA.SpreedMe.Models || {};

	var ChatMessageCollection = Backbone.Collection.extend({
		model: OCA.SpreedMe.Models.ChatMessage,

		initialize: function(models, options) {
			if (options.token === undefined) {
				throw 'Missing parameter token';
			}

			this.token = options.token;

			this.url = OC.linkToOCS('apps/spreed/api/v1', 2) + 'chat/' + this.token;
		},

		comparator: function(model) {
			return (model.get('timestamp'));
		},

		parse: function(result) {
			return result.ocs.data;
		},

		set: function(models, options) {
			// TODO Provide the models already sorted to set, as even if setting
			// 'sort: true' in the options the 'add' events are sent in the
			// original order of models passed to set.
			if (models !== undefined && models !== null && models.ocs !== undefined && models.ocs.data !== undefined) {
				models.ocs.data = _.sortBy(models.ocs.data, function(model) {
					return model.timestamp;
				});
			}

			return Backbone.Collection.prototype.set.call(this, models, options);
		},

		receiveMessages: function() {
			this.fetch({remove: false, success: _.bind(this.receiveMessages, this), error: _.bind(this.receiveMessages, this)});
		}
	});

	OCA.SpreedMe.Models.ChatMessageCollection = ChatMessageCollection;

})(OCA, OC, Backbone);

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

(function(OCA, Backbone) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Models = OCA.SpreedMe.Models || {};

	var ChatMessage = Backbone.Model.extend({
		defaults: {
			actorType: '',
			actorId: '',
			actorDisplayName: '',
			timestamp: 0,
			message: ''
		},

		initialize: function(options) {
			if (options.token === undefined) {
				throw 'Missing parameter token';
			}

			this.token = options.token;

			// Used to send a message
			// TODO ensure that it is not used for anything else
			this.url = OC.linkToOCS('apps/spreed/api/v1', 2) + 'chat/' + this.token;
		}

	});

	OCA.SpreedMe.Models.ChatMessage = ChatMessage;

})(OCA, Backbone);

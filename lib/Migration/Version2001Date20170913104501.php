<?php
/**
 * @copyright Copyright (c) 2017 Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
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
namespace OCA\Spreed\Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Type;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version2001Date20170913104501 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param \Closure $schemaClosure The `\Closure` returns a `Schema`
	 * @param array $options
	 * @return null|Schema
	 * @since 13.0.0
	 */
	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options) {
		/** @var Schema $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('videocalls_signaling')) {
			$table = $schema->createTable('videocalls_signaling');

			$table->addColumn('sender', Type::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('recipient', Type::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('message', Type::TEXT, [
				'notnull' => true,
			]);
			$table->addColumn('timestamp', Type::INTEGER, [
				'notnull' => true,
				'length' => 11,
			]);

			$table->addIndex(['recipient', 'timestamp'], 'vcsig_recipient');
		}

		if ($schema->hasTable('spreedme_messages')) {
			$schema->dropTable('spreedme_messages');
		}

		return $schema;
	}

}

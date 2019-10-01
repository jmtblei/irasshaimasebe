// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
		connection: {
			filename: './data/local.sqlite3'
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		pool: {
			// afterCreate: (conn, done) => {
			//   conn.run("PRAGMA foreign_keys = ON", done);
			max: 10,
			min: 0
		}
  },

};

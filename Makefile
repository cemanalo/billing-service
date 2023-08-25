DB_COMMAND=node node_modules/db-migrate/bin/db-migrate
DB_MIGRATE_CONFIG=migrations/config/database.json
DB_ADD_MIGRATION_NAME=create_billing_table

NODE_COMMAND=docker-compose run --rm node


# dockerize to wait db server to start
dbStart:
	docker-compose up -d db
	docker-compose run --rm dockerize -wait tcp://db:5432 -timeout 60s

dbStop:
	docker-compose down db

# db client
adminer:
	docker-compose up -d adminer

dbMigrateUp:
	$(NODE_COMMAND) $(DB_COMMAND) up --config $(DB_MIGRATE_CONFIG)

dbMigrateDown:
	$(NODE_COMMAND) $(DB_COMMAND) down --config $(DB_MIGRATE_CONFIG)

dbCreate:
	$(NODE_COMMAND) $(DB_COMMAND) db:create water_district --config $(DB_MIGRATE_CONFIG) -e init

dbMigrateNew:
	$(NODE_COMMAND) $(DB_COMMAND) create $(DB_ADD_MIGRATION_NAME) --config $(DB_MIGRATE_CONFIG)

deps:
	$(NODE_COMMAND) make _deps

_deps:
	npm install

_tsc:
	node node_modules/typescript/bin/tsc

nodeCli:
	$(NODE_COMMAND) node ./dist/test.js

_prettifyAll:
	npx prettier . --write 

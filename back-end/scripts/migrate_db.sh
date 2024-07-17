#!/bin/bash

echo "Running database migration..."

node ./database/db.ts

echo "Database migration completed."
#!/bin/sh

# Exit on error
set -e

echo "Running migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate

echo "Seeding database..."
npm run seed || echo "No seed script found, skipping..."

echo "Starting server..."
exec "$@"
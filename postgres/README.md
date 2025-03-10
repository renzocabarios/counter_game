docker-compose up -d
docker exec -it prisma_postgres psql -U postgres -d mydb
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
pnpm prisma migrate dev --name init
pnpm prisma migrate dev
docker-compose down
docker-compose down -v

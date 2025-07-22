include .env
include .env.local

migration-up:
	migrate -path .migrations -database ""$$DATABASE_URL"" -verbose up
migration-down:
	migrate -path .migrations -database ""$$DATABASE_URL"" -verbose down
run:
	go run main.go
build:
	go build -o .bin/app main.go

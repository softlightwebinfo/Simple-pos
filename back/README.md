# golang_grpc
- go run main.go
- go run client/main.go
- protoc --go_out=plugins=grpc:. **/*.proto
- protoc --go_out=plugins=grpc:. **/*.proto && watcher 
- protoc --go_out=plugins=grpc:. **/*.proto
- protoc --go_out=plugins=grpc:../DocumentationApp/ **/*.proto
- protoc --dart_out=grpc:lib/build/ -Ilib/protos lib/protos/*.proto 
- http://stanfordzhang.com/post/642e1725
- ln -s /mnt/postgres-data ./postgres-data
## BUILD PRODUCTION
- docker build -t lvrs:latest .
- docker run --network="host" -d --rm -p 4040:4040 lvrs
#!/usr/bin/env bash
export GOPATH=$HOME/go
PATH=$PATH:$GOPATH/bin
cd ../back
protoc --go_out=plugins=grpc:. **/*.proto
cd ../front/scripts

./copyprotoc.sh

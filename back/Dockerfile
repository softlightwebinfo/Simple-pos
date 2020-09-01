FROM golang:latest

WORKDIR /src
RUN mkdir /api
COPY ./ ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /api/server
EXPOSE 4040
CMD ["/api/server"]

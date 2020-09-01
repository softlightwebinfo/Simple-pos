package controllers

import (
	"article/proto"
	"context"
)

type AddController struct {
}

func (s *AddController) Add(ctx context.Context, request *proto.Request) (*proto.Response, error) {
	a, b := request.GetA(), request.GetB()
	result := a + b
	return &proto.Response{
		Result: result,
	}, nil
}

func (s *AddController) Multiply(ctx context.Context, request *proto.Request) (*proto.Response, error) {
	a, b := request.GetA(), request.GetB()
	result := a * b

	return &proto.Response{
		Result: result,
	}, nil
}

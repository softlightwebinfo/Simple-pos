// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0
// 	protoc        v3.12.4
// source: proto/categoryService.proto

package proto

import (
	context "context"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

type CategoryServiceBool struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Success bool `protobuf:"varint,1,opt,name=success,proto3" json:"success,omitempty"`
}

func (x *CategoryServiceBool) Reset() {
	*x = CategoryServiceBool{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceBool) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceBool) ProtoMessage() {}

func (x *CategoryServiceBool) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceBool.ProtoReflect.Descriptor instead.
func (*CategoryServiceBool) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{0}
}

func (x *CategoryServiceBool) GetSuccess() bool {
	if x != nil {
		return x.Success
	}
	return false
}

type CategoryServiceCreateRq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name     string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	ParentId int64  `protobuf:"varint,2,opt,name=parentId,proto3" json:"parentId,omitempty"`
}

func (x *CategoryServiceCreateRq) Reset() {
	*x = CategoryServiceCreateRq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceCreateRq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceCreateRq) ProtoMessage() {}

func (x *CategoryServiceCreateRq) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceCreateRq.ProtoReflect.Descriptor instead.
func (*CategoryServiceCreateRq) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{1}
}

func (x *CategoryServiceCreateRq) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CategoryServiceCreateRq) GetParentId() int64 {
	if x != nil {
		return x.ParentId
	}
	return 0
}

type CategoryServiceModel struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id       int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Name     string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	ParentId int64  `protobuf:"varint,3,opt,name=parentId,proto3" json:"parentId,omitempty"`
}

func (x *CategoryServiceModel) Reset() {
	*x = CategoryServiceModel{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceModel) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceModel) ProtoMessage() {}

func (x *CategoryServiceModel) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceModel.ProtoReflect.Descriptor instead.
func (*CategoryServiceModel) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{2}
}

func (x *CategoryServiceModel) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *CategoryServiceModel) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CategoryServiceModel) GetParentId() int64 {
	if x != nil {
		return x.ParentId
	}
	return 0
}

type CategoryServiceUpdateRq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id       int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Name     string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	ParentId int64  `protobuf:"varint,3,opt,name=parentId,proto3" json:"parentId,omitempty"`
}

func (x *CategoryServiceUpdateRq) Reset() {
	*x = CategoryServiceUpdateRq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceUpdateRq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceUpdateRq) ProtoMessage() {}

func (x *CategoryServiceUpdateRq) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceUpdateRq.ProtoReflect.Descriptor instead.
func (*CategoryServiceUpdateRq) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{3}
}

func (x *CategoryServiceUpdateRq) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *CategoryServiceUpdateRq) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CategoryServiceUpdateRq) GetParentId() int64 {
	if x != nil {
		return x.ParentId
	}
	return 0
}

type CategoryServiceGetRq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *CategoryServiceGetRq) Reset() {
	*x = CategoryServiceGetRq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceGetRq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceGetRq) ProtoMessage() {}

func (x *CategoryServiceGetRq) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceGetRq.ProtoReflect.Descriptor instead.
func (*CategoryServiceGetRq) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{4}
}

func (x *CategoryServiceGetRq) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

type CategoryServiceGetRs struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id       int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Name     string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	ParentId int64  `protobuf:"varint,3,opt,name=parentId,proto3" json:"parentId,omitempty"`
}

func (x *CategoryServiceGetRs) Reset() {
	*x = CategoryServiceGetRs{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceGetRs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceGetRs) ProtoMessage() {}

func (x *CategoryServiceGetRs) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceGetRs.ProtoReflect.Descriptor instead.
func (*CategoryServiceGetRs) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{5}
}

func (x *CategoryServiceGetRs) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *CategoryServiceGetRs) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CategoryServiceGetRs) GetParentId() int64 {
	if x != nil {
		return x.ParentId
	}
	return 0
}

type CategoryServiceGetAllRq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Offset string `protobuf:"bytes,1,opt,name=offset,proto3" json:"offset,omitempty"`
	Limit  string `protobuf:"bytes,2,opt,name=limit,proto3" json:"limit,omitempty"`
}

func (x *CategoryServiceGetAllRq) Reset() {
	*x = CategoryServiceGetAllRq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceGetAllRq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceGetAllRq) ProtoMessage() {}

func (x *CategoryServiceGetAllRq) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceGetAllRq.ProtoReflect.Descriptor instead.
func (*CategoryServiceGetAllRq) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{6}
}

func (x *CategoryServiceGetAllRq) GetOffset() string {
	if x != nil {
		return x.Offset
	}
	return ""
}

func (x *CategoryServiceGetAllRq) GetLimit() string {
	if x != nil {
		return x.Limit
	}
	return ""
}

type CategoryServiceGetAllRs struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Result []*CategoryServiceModel `protobuf:"bytes,1,rep,name=result,proto3" json:"result,omitempty"`
	Count  int64                   `protobuf:"varint,2,opt,name=count,proto3" json:"count,omitempty"`
}

func (x *CategoryServiceGetAllRs) Reset() {
	*x = CategoryServiceGetAllRs{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceGetAllRs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceGetAllRs) ProtoMessage() {}

func (x *CategoryServiceGetAllRs) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceGetAllRs.ProtoReflect.Descriptor instead.
func (*CategoryServiceGetAllRs) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{7}
}

func (x *CategoryServiceGetAllRs) GetResult() []*CategoryServiceModel {
	if x != nil {
		return x.Result
	}
	return nil
}

func (x *CategoryServiceGetAllRs) GetCount() int64 {
	if x != nil {
		return x.Count
	}
	return 0
}

type CategoryServiceDeleteRq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *CategoryServiceDeleteRq) Reset() {
	*x = CategoryServiceDeleteRq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_categoryService_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CategoryServiceDeleteRq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CategoryServiceDeleteRq) ProtoMessage() {}

func (x *CategoryServiceDeleteRq) ProtoReflect() protoreflect.Message {
	mi := &file_proto_categoryService_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CategoryServiceDeleteRq.ProtoReflect.Descriptor instead.
func (*CategoryServiceDeleteRq) Descriptor() ([]byte, []int) {
	return file_proto_categoryService_proto_rawDescGZIP(), []int{8}
}

func (x *CategoryServiceDeleteRq) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

var File_proto_categoryService_proto protoreflect.FileDescriptor

var file_proto_categoryService_proto_rawDesc = []byte{
	0x0a, 0x1b, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0x2f, 0x0a, 0x13, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x42, 0x6f, 0x6f, 0x6c, 0x12, 0x18, 0x0a, 0x07, 0x73,
	0x75, 0x63, 0x63, 0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x73, 0x75,
	0x63, 0x63, 0x65, 0x73, 0x73, 0x22, 0x49, 0x0a, 0x17, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72,
	0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x71,
	0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x72, 0x65, 0x6e, 0x74, 0x49, 0x64,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08, 0x70, 0x61, 0x72, 0x65, 0x6e, 0x74, 0x49, 0x64,
	0x22, 0x56, 0x0a, 0x14, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x4d, 0x6f, 0x64, 0x65, 0x6c, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08,
	0x70, 0x61, 0x72, 0x65, 0x6e, 0x74, 0x49, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08,
	0x70, 0x61, 0x72, 0x65, 0x6e, 0x74, 0x49, 0x64, 0x22, 0x59, 0x0a, 0x17, 0x43, 0x61, 0x74, 0x65,
	0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x55, 0x70, 0x64, 0x61, 0x74,
	0x65, 0x52, 0x71, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x72, 0x65, 0x6e,
	0x74, 0x49, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08, 0x70, 0x61, 0x72, 0x65, 0x6e,
	0x74, 0x49, 0x64, 0x22, 0x26, 0x0a, 0x14, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x47, 0x65, 0x74, 0x52, 0x71, 0x12, 0x0e, 0x0a, 0x02, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x22, 0x56, 0x0a, 0x14, 0x43,
	0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x47, 0x65,
	0x74, 0x52, 0x73, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x72, 0x65, 0x6e,
	0x74, 0x49, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08, 0x70, 0x61, 0x72, 0x65, 0x6e,
	0x74, 0x49, 0x64, 0x22, 0x47, 0x0a, 0x17, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x52, 0x71, 0x12, 0x16,
	0x0a, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06,
	0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x22, 0x64, 0x0a, 0x17,
	0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x47,
	0x65, 0x74, 0x41, 0x6c, 0x6c, 0x52, 0x73, 0x12, 0x33, 0x0a, 0x06, 0x72, 0x65, 0x73, 0x75, 0x6c,
	0x74, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e,
	0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x4d,
	0x6f, 0x64, 0x65, 0x6c, 0x52, 0x06, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x12, 0x14, 0x0a, 0x05,
	0x63, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x05, 0x63, 0x6f, 0x75,
	0x6e, 0x74, 0x22, 0x29, 0x0a, 0x17, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x52, 0x71, 0x12, 0x0e, 0x0a,
	0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x32, 0xee, 0x02,
	0x0a, 0x0f, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x12, 0x44, 0x0a, 0x06, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x12, 0x1e, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x71, 0x1a, 0x1a, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x42, 0x6f, 0x6f, 0x6c, 0x12, 0x44, 0x0a, 0x06, 0x55, 0x70, 0x64, 0x61, 0x74,
	0x65, 0x12, 0x1e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f,
	0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x52,
	0x71, 0x1a, 0x1a, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f,
	0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x42, 0x6f, 0x6f, 0x6c, 0x12, 0x3f, 0x0a,
	0x03, 0x47, 0x65, 0x74, 0x12, 0x1b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74,
	0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x47, 0x65, 0x74, 0x52,
	0x71, 0x1a, 0x1b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f,
	0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x47, 0x65, 0x74, 0x52, 0x73, 0x12, 0x48,
	0x0a, 0x06, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x12, 0x1e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x52, 0x71, 0x1a, 0x1e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2e, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x52, 0x73, 0x12, 0x44, 0x0a, 0x06, 0x44, 0x65, 0x6c, 0x65,
	0x74, 0x65, 0x12, 0x1e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67,
	0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65,
	0x52, 0x71, 0x1a, 0x1a, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x61, 0x74, 0x65, 0x67,
	0x6f, 0x72, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x42, 0x6f, 0x6f, 0x6c, 0x62, 0x06,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_categoryService_proto_rawDescOnce sync.Once
	file_proto_categoryService_proto_rawDescData = file_proto_categoryService_proto_rawDesc
)

func file_proto_categoryService_proto_rawDescGZIP() []byte {
	file_proto_categoryService_proto_rawDescOnce.Do(func() {
		file_proto_categoryService_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_categoryService_proto_rawDescData)
	})
	return file_proto_categoryService_proto_rawDescData
}

var file_proto_categoryService_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_proto_categoryService_proto_goTypes = []interface{}{
	(*CategoryServiceBool)(nil),     // 0: proto.CategoryServiceBool
	(*CategoryServiceCreateRq)(nil), // 1: proto.CategoryServiceCreateRq
	(*CategoryServiceModel)(nil),    // 2: proto.CategoryServiceModel
	(*CategoryServiceUpdateRq)(nil), // 3: proto.CategoryServiceUpdateRq
	(*CategoryServiceGetRq)(nil),    // 4: proto.CategoryServiceGetRq
	(*CategoryServiceGetRs)(nil),    // 5: proto.CategoryServiceGetRs
	(*CategoryServiceGetAllRq)(nil), // 6: proto.CategoryServiceGetAllRq
	(*CategoryServiceGetAllRs)(nil), // 7: proto.CategoryServiceGetAllRs
	(*CategoryServiceDeleteRq)(nil), // 8: proto.CategoryServiceDeleteRq
}
var file_proto_categoryService_proto_depIdxs = []int32{
	2, // 0: proto.CategoryServiceGetAllRs.result:type_name -> proto.CategoryServiceModel
	1, // 1: proto.CategoryService.Create:input_type -> proto.CategoryServiceCreateRq
	3, // 2: proto.CategoryService.Update:input_type -> proto.CategoryServiceUpdateRq
	4, // 3: proto.CategoryService.Get:input_type -> proto.CategoryServiceGetRq
	6, // 4: proto.CategoryService.GetAll:input_type -> proto.CategoryServiceGetAllRq
	8, // 5: proto.CategoryService.Delete:input_type -> proto.CategoryServiceDeleteRq
	0, // 6: proto.CategoryService.Create:output_type -> proto.CategoryServiceBool
	0, // 7: proto.CategoryService.Update:output_type -> proto.CategoryServiceBool
	5, // 8: proto.CategoryService.Get:output_type -> proto.CategoryServiceGetRs
	7, // 9: proto.CategoryService.GetAll:output_type -> proto.CategoryServiceGetAllRs
	0, // 10: proto.CategoryService.Delete:output_type -> proto.CategoryServiceBool
	6, // [6:11] is the sub-list for method output_type
	1, // [1:6] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_proto_categoryService_proto_init() }
func file_proto_categoryService_proto_init() {
	if File_proto_categoryService_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_categoryService_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceBool); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceCreateRq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceModel); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceUpdateRq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceGetRq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceGetRs); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceGetAllRq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceGetAllRs); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_categoryService_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CategoryServiceDeleteRq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_categoryService_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_categoryService_proto_goTypes,
		DependencyIndexes: file_proto_categoryService_proto_depIdxs,
		MessageInfos:      file_proto_categoryService_proto_msgTypes,
	}.Build()
	File_proto_categoryService_proto = out.File
	file_proto_categoryService_proto_rawDesc = nil
	file_proto_categoryService_proto_goTypes = nil
	file_proto_categoryService_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// CategoryServiceClient is the client API for CategoryService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type CategoryServiceClient interface {
	Create(ctx context.Context, in *CategoryServiceCreateRq, opts ...grpc.CallOption) (*CategoryServiceBool, error)
	Update(ctx context.Context, in *CategoryServiceUpdateRq, opts ...grpc.CallOption) (*CategoryServiceBool, error)
	Get(ctx context.Context, in *CategoryServiceGetRq, opts ...grpc.CallOption) (*CategoryServiceGetRs, error)
	GetAll(ctx context.Context, in *CategoryServiceGetAllRq, opts ...grpc.CallOption) (*CategoryServiceGetAllRs, error)
	Delete(ctx context.Context, in *CategoryServiceDeleteRq, opts ...grpc.CallOption) (*CategoryServiceBool, error)
}

type categoryServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewCategoryServiceClient(cc grpc.ClientConnInterface) CategoryServiceClient {
	return &categoryServiceClient{cc}
}

func (c *categoryServiceClient) Create(ctx context.Context, in *CategoryServiceCreateRq, opts ...grpc.CallOption) (*CategoryServiceBool, error) {
	out := new(CategoryServiceBool)
	err := c.cc.Invoke(ctx, "/proto.CategoryService/Create", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) Update(ctx context.Context, in *CategoryServiceUpdateRq, opts ...grpc.CallOption) (*CategoryServiceBool, error) {
	out := new(CategoryServiceBool)
	err := c.cc.Invoke(ctx, "/proto.CategoryService/Update", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) Get(ctx context.Context, in *CategoryServiceGetRq, opts ...grpc.CallOption) (*CategoryServiceGetRs, error) {
	out := new(CategoryServiceGetRs)
	err := c.cc.Invoke(ctx, "/proto.CategoryService/Get", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) GetAll(ctx context.Context, in *CategoryServiceGetAllRq, opts ...grpc.CallOption) (*CategoryServiceGetAllRs, error) {
	out := new(CategoryServiceGetAllRs)
	err := c.cc.Invoke(ctx, "/proto.CategoryService/GetAll", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) Delete(ctx context.Context, in *CategoryServiceDeleteRq, opts ...grpc.CallOption) (*CategoryServiceBool, error) {
	out := new(CategoryServiceBool)
	err := c.cc.Invoke(ctx, "/proto.CategoryService/Delete", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// CategoryServiceServer is the server API for CategoryService service.
type CategoryServiceServer interface {
	Create(context.Context, *CategoryServiceCreateRq) (*CategoryServiceBool, error)
	Update(context.Context, *CategoryServiceUpdateRq) (*CategoryServiceBool, error)
	Get(context.Context, *CategoryServiceGetRq) (*CategoryServiceGetRs, error)
	GetAll(context.Context, *CategoryServiceGetAllRq) (*CategoryServiceGetAllRs, error)
	Delete(context.Context, *CategoryServiceDeleteRq) (*CategoryServiceBool, error)
}

// UnimplementedCategoryServiceServer can be embedded to have forward compatible implementations.
type UnimplementedCategoryServiceServer struct {
}

func (*UnimplementedCategoryServiceServer) Create(context.Context, *CategoryServiceCreateRq) (*CategoryServiceBool, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Create not implemented")
}
func (*UnimplementedCategoryServiceServer) Update(context.Context, *CategoryServiceUpdateRq) (*CategoryServiceBool, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Update not implemented")
}
func (*UnimplementedCategoryServiceServer) Get(context.Context, *CategoryServiceGetRq) (*CategoryServiceGetRs, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Get not implemented")
}
func (*UnimplementedCategoryServiceServer) GetAll(context.Context, *CategoryServiceGetAllRq) (*CategoryServiceGetAllRs, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAll not implemented")
}
func (*UnimplementedCategoryServiceServer) Delete(context.Context, *CategoryServiceDeleteRq) (*CategoryServiceBool, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Delete not implemented")
}

func RegisterCategoryServiceServer(s *grpc.Server, srv CategoryServiceServer) {
	s.RegisterService(&_CategoryService_serviceDesc, srv)
}

func _CategoryService_Create_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CategoryServiceCreateRq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).Create(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.CategoryService/Create",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).Create(ctx, req.(*CategoryServiceCreateRq))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_Update_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CategoryServiceUpdateRq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).Update(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.CategoryService/Update",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).Update(ctx, req.(*CategoryServiceUpdateRq))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_Get_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CategoryServiceGetRq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).Get(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.CategoryService/Get",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).Get(ctx, req.(*CategoryServiceGetRq))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_GetAll_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CategoryServiceGetAllRq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).GetAll(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.CategoryService/GetAll",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).GetAll(ctx, req.(*CategoryServiceGetAllRq))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_Delete_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CategoryServiceDeleteRq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).Delete(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.CategoryService/Delete",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).Delete(ctx, req.(*CategoryServiceDeleteRq))
	}
	return interceptor(ctx, in, info, handler)
}

var _CategoryService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "proto.CategoryService",
	HandlerType: (*CategoryServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Create",
			Handler:    _CategoryService_Create_Handler,
		},
		{
			MethodName: "Update",
			Handler:    _CategoryService_Update_Handler,
		},
		{
			MethodName: "Get",
			Handler:    _CategoryService_Get_Handler,
		},
		{
			MethodName: "GetAll",
			Handler:    _CategoryService_GetAll_Handler,
		},
		{
			MethodName: "Delete",
			Handler:    _CategoryService_Delete_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/categoryService.proto",
}

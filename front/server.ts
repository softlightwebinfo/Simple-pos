import next from 'next'
import express from 'express';
import * as path from "path";

const bodyParser = require("body-parser");
// @ts-ignore
import user from "./apis/user";
import GRPCClient from 'node-grpc-client';
import exampleApi from "./apis/exampleApi";
import banner from "./apis/banner";
import studio from "./apis/studio";
import rest from "./apis/rest";
import stream from "./apis/stream";
import store from "./apis/store";
const multer = require('multer');
// @ts-ignore
const sharp = require('sharp');
const routes = require('./routes');
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handler = routes.getRequestHandler(app);
const cookieParser = require('cookie-parser');

// SERVER AND IO SOCKET
let serverExpress = express();

const server = require('http').createServer(serverExpress);
const io = require('socket.io')(server);

// SERVICES PROTOS
const PROTO_PATH_USER_SERVICE = __dirname + '/proto/userService.proto';
const PROTO_PATH_BANNER_SERVICE = __dirname + '/proto/bannerService.proto';
const PROTO_PATH_STUDIO_SERVICE = __dirname + '/proto/studioService.proto';
const PROTO_PATH_CONTACT_SERVICE = __dirname + '/proto/contactService.proto';
const PROTO_PATH_STREAM_SERVICE = __dirname + '/proto/streamService.proto';
const PROTO_PATH_STORE_SERVICE = __dirname + '/proto/storeService.proto';

// CONFIGS
let storage = multer.diskStorage({
    destination: function (_, __, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        const name = file.fieldname + '-' + Date.now() + ext;
        req.filename = name;
        callback(null, name);
    },
});
let upload = multer({storage: storage}).single('file');
let uploadMultiple = multer({storage: storage}).array('file', 10);

const userService = new GRPCClient(PROTO_PATH_USER_SERVICE, 'proto', 'UserService', 'localhost:4040');
const bannerService = new GRPCClient(PROTO_PATH_BANNER_SERVICE, 'proto', 'BannerService', 'localhost:4040');
const studioService = new GRPCClient(PROTO_PATH_STUDIO_SERVICE, 'proto', 'StudioService', 'localhost:4040');
const contactService = new GRPCClient(PROTO_PATH_CONTACT_SERVICE, 'proto', 'ContactService', 'localhost:4040');
const streamService = new GRPCClient(PROTO_PATH_STREAM_SERVICE, 'proto', 'StreamService', 'localhost:4040');
const storeService = new GRPCClient(PROTO_PATH_STORE_SERVICE, 'proto', 'StoreService', 'localhost:4040');

const activeUsers = new Set();
io.on("connection", function (socket) {
    socket.on("new user", function (data) {
        socket.userId = data;
        activeUsers.add(data);
    });

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId);
    });
});
// With express
app.prepare().then(() => {
    serverExpress.use(express.json());
    serverExpress.use(cookieParser());
    serverExpress.use(bodyParser.json());
    serverExpress.use(bodyParser.urlencoded({extended: false}));
    serverExpress.use(express.static(path.join(__dirname, 'public')));
    serverExpress.use(function (req, _, next) {
        // @ts-ignore
        req.io = io;
        next();
    })
    exampleApi();
    user(serverExpress, {userService});
    banner(serverExpress, {bannerService, upload});
    studio(serverExpress, {studioService, upload, uploadMultiple});
    stream(serverExpress, {upload, streamService});
    rest(serverExpress, {contactService});
    store(serverExpress, {storeService});
    serverExpress.use(handler);
    server.listen(3000);
});
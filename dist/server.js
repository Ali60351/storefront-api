"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var store_user_1 = __importDefault(require("./handlers/store_user"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
app.use('/user', store_user_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});

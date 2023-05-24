"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const index_1 = require("./src/http_server/index");
const screenshot_1 = __importDefault(require("./src/screenshot"));
const mouse_move_1 = __importDefault(require("./src/mouse_move"));
const mouse_figures_1 = __importDefault(require("./src/mouse_figures"));
const HTTP_PORT = 8181;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
const ws = new ws_1.WebSocketServer({ port: 8080 });
ws.on("connection", (socket) => {
    socket.on("message", async (data) => {
        try {
            const dataFront = data.toString("utf-8");
            const moveParam = dataFront.split(" ");
            if (moveParam[0].indexOf("draw") > -1) {
                await (0, mouse_figures_1.default)(moveParam);
            }
            else if (moveParam[0] === "prnt_scrn") {
                const img = await (0, screenshot_1.default)();
                socket.send(img);
            }
            else if (moveParam[0].indexOf("mouse") > -1) {
                const mousePosition = await (0, mouse_move_1.default)(moveParam);
                if (mousePosition) {
                    socket.send(mousePosition);
                }
            }
            else {
                socket.send(dataFront);
            }
        }
        catch (error) {
            socket.send(data.toString("utf-8"));
        }
    });
});

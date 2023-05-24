"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nut_js_1 = require("@nut-tree/nut-js");
async function mouseMove(command) {
    try {
        const commandType = command[0];
        const position = Number(command[1]);
        const objControl = {
            "mouse_right": async () => {
                await nut_js_1.mouse.move((0, nut_js_1.right)(position));
            },
            "mouse_left": async () => {
                await nut_js_1.mouse.move((0, nut_js_1.left)(position));
            },
            "mouse_up": async () => {
                await nut_js_1.mouse.move((0, nut_js_1.up)(position));
            },
            "mouse_down": async () => {
                await nut_js_1.mouse.move((0, nut_js_1.down)(position));
            },
            "mouse_position": async () => {
                const { x, y } = await nut_js_1.mouse.getPosition();
                return `mouse_position ${x}px,${y}px`;
            }
        };
        if (commandType) {
            const position = await objControl[commandType]();
            if (position) {
                return position;
            }
        }
    }
    catch (error) {
        console.log(error);
        return "mouse_position 0px,0px";
    }
}
exports.default = mouseMove;

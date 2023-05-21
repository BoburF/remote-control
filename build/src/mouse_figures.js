"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nut_js_1 = require("@nut-tree/nut-js");
async function mouseDraw(command) {
    try {
        const commandType = command[0];
        const size = [Number(command[1]), Number(command[2])];
        const objControl = {
            "draw_square": async () => {
                await nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
                await nut_js_1.mouse.move((0, nut_js_1.left)(size[0]));
                await nut_js_1.mouse.move((0, nut_js_1.up)(size[0]));
                await nut_js_1.mouse.move((0, nut_js_1.right)(size[0]));
                await nut_js_1.mouse.move((0, nut_js_1.down)(size[0]));
                await nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            },
            "draw_circle": async () => {
                const { x, y } = await nut_js_1.mouse.getPosition();
                for (let i = 0; i <= Math.PI * 2; i += 0.01) {
                    const xCor = x + size[0] * Math.cos(i);
                    const yCor = y + size[0] * Math.sin(i);
                    const newPoint = new nut_js_1.Point(xCor, yCor);
                    if (i === 0.01) {
                        await nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
                    }
                    await nut_js_1.mouse.move((0, nut_js_1.straightTo)(newPoint));
                }
                await nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            },
            "draw_rectangle": async () => {
                await nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
                await nut_js_1.mouse.move((0, nut_js_1.left)(size[0]));
                await nut_js_1.mouse.move((0, nut_js_1.up)(size[1]));
                await nut_js_1.mouse.move((0, nut_js_1.right)(size[0]));
                await nut_js_1.mouse.move((0, nut_js_1.down)(size[1]));
                await nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            }
        };
        if (commandType) {
            await objControl[commandType]();
        }
    }
    catch (error) {
        console.log(error);
        await (await (await (await nut_js_1.mouse.drag((0, nut_js_1.left)(100))).drag((0, nut_js_1.up)(100))).drag((0, nut_js_1.right)(100))).drag((0, nut_js_1.down)(100));
    }
}
exports.default = mouseDraw;

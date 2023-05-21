"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nut_js_1 = require("@nut-tree/nut-js");
const jimp_1 = __importDefault(require("jimp"));
async function screenShot() {
    try {
        let { x, y } = await nut_js_1.mouse.getPosition();
        const size = {
            width: await nut_js_1.screen.width(),
            heigth: await nut_js_1.screen.height()
        };
        if (x > size.width - 200) {
            x = size.width - 200;
        }
        else if (x < 200) {
            x = 200;
        }
        if (y > size.heigth - 200) {
            y = size.heigth - 200;
        }
        else if (y < 200) {
            y = 200;
        }
        const screeenShot = await nut_js_1.screen.grabRegion(new nut_js_1.Region(x, y, 200, 200));
        const img = new jimp_1.default(screeenShot);
        let dataImg;
        img.getBase64(jimp_1.default.MIME_PNG, (err, data) => {
            if (err)
                console.log(err);
            else {
                dataImg = data.slice(22);
            }
        });
        return `prnt_scrn ${dataImg}`;
    }
    catch (error) {
        console.log(error);
        return "prnt_scrn";
    }
}
exports.default = screenShot;

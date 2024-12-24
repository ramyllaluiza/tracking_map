"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesDriverGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let RoutesDriverGateway = class RoutesDriverGateway {
    handleMessage(client, payload) {
        return 'Hello world!';
    }
};
exports.RoutesDriverGateway = RoutesDriverGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], RoutesDriverGateway.prototype, "handleMessage", null);
exports.RoutesDriverGateway = RoutesDriverGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], RoutesDriverGateway);
//# sourceMappingURL=routes-driver.gateway.js.map
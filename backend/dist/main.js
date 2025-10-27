"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
    console.error('Error starting application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
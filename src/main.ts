import "dotenv/config"
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/validation.pipe';
import { AuthGuard } from './shared/auth.guard';

async function bootstrap() {
  	const app = await NestFactory.create(AppModule, {cors: true})
  	await app.listen(3030)
  	app.useGlobalPipes(new ValidationPipe())
  	app.useGlobalGuards(new AuthGuard())
  	Logger.log(`Server is up and running on http://localhost:${3030}`, "Bootstrap")
}
bootstrap()

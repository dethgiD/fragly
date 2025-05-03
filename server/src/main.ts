import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// --- Use default import for express-session ---
import session from 'express-session';
// --------------------------------------------
import passport from 'passport';
import { createClient } from 'redis';

// --- Use require for connect-redis ---
// Necessary if TS cannot resolve the default import as constructable
import {RedisStore} from "connect-redis"
// -------------------------------------

// Declare module if needed (usually in a global .d.ts)
declare module 'express-session' {
  interface SessionData { /* Add custom session fields if any */ }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Configure Session Store (Redis v7+) ---
  const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  redisClient.on('error', (err) => console.error('🔴 Redis Client Error:', err));
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis successfully.');
  } catch (err) {
    console.error('🔴 Failed to connect to Redis on startup:', err);
    process.exit(1);
  }

  // --- Instantiate using 'new' with the require'd variable ---
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "fragly_sess:",
  });
  console.log('✅ RedisStore instance configured.');
  // -------------------------------------------------

  // --- CORS Configuration ---
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });
  // -------------------------------------

  // --- Session Middleware Configuration ---
  // Use the default-imported 'session' directly
  app.use(
    session({ // Should now work with the default import
      store: redisStore,
      secret: process.env.SESSION_SECRET || 'replace_this_with_a_real_secret_in_env', // !! USE ENV VAR !!
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax'
      },
    }),
  );
  // --------------------------------------

  // --- Passport Middleware Initialization ---
  app.use(passport.initialize());
  app.use(passport.session());
  // --------------------------------------

  // --- Start Listening ---
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
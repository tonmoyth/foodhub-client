import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    BACKEND_API: z.url(),
    FRONTEND_API: z.url(),
    AUTH_API: z.url(),
    API_URL: z.url(),
  },

  runtimeEnv: {
    BACKEND_API: process.env.BACKEND_API,
    FRONTEND_API: process.env.FRONTEND_API,
    AUTH_API: process.env.AUTH_API,
    API_URL: process.env.API_URL,
  },
});

// src/types/next-auth.d.ts

import NextAuth, { DefaultSession } from 'next-auth';

// Extiende la interfaz Session para incluir la propiedad 'role' en el usuario
declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's name. */
      name?: string | null;
      /** The user's email. */
      email?: string | null;
      /** The user's profile picture. */
      image?: string | null;
      /** Custom role property added to the user. */
      role?: string | null;
    } & DefaultSession['user'];
  }
}

// Opcional: Extiende el tipo User en caso de que utilices un adaptador personalizado
declare module 'next-auth/jwt' {
  interface JWT {
    /** Custom role property added to the JWT. */
    role?: string | null;
  }
}

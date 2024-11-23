import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's name. */
      name?: string | null;
      /** The user's email. */
      email?: string | null;
      /** The user's profile picture. */
      image?: string | null;
      /** Custom isAdmin property added to the user. */
      isAdmin?: boolean | null;
    } & DefaultSession["user"];
  }
}

// Opcional: Extiende el tipo User en caso de que utilices un adaptador personalizado
declare module "next-auth/jwt" {
  interface JWT {
    /** Custom isAdmin property added to the JWT. */
    isAdmin?: boolean | null;
  }
}



declare module "next-auth" {

    interface Session {
  
      accessToken?: string | null;
  
    }
  
  }
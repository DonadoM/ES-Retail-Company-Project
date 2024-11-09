"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Loader2,
  LogOut,
  ShoppingBag,
  User,
  Mail,
  Shield,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProfilePageComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#114B5F]">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-screen flex-col items-center justify-center bg-[#114B5F] px-4"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-3xl font-bold text-white"
        >
          Access Denied
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center text-white"
        >
          Please sign in to view your profile.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#114B5F] px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <Card className="overflow-hidden bg-white shadow-xl">
          <CardHeader className="relative pb-24 pt-6">
            <div className="absolute inset-0 bg-[#D8DBE2]">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(17,75,95,0.1) 0%, rgba(17,75,95,0) 100%)",
                    "radial-gradient(circle, rgba(17,75,95,0.2) 0%, rgba(17,75,95,0) 100%)",
                    "radial-gradient(circle, rgba(17,75,95,0.1) 0%, rgba(17,75,95,0) 100%)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 text-center"
            >
              <Avatar className="mx-auto h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || "User"}
                />
                <AvatarFallback>
                  <User className="h-12 w-12 text-[#114B5F]" />
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold text-[#114B5F]">
                {session.user?.name || "User"}
              </h2>
              <p className="text-sm font-medium text-[#114B5F]/80">
                {session.user?.email || "No email provided"}
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="px-4 py-5 sm:p-6">
            <dl className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center"
              >
                <dt className="flex items-center text-sm font-medium text-[#114B5F]">
                  <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-[#114B5F]" />
                  User ID
                </dt>
                <dd className="ml-auto text-sm text-[#114B5F]">
                  {session.user?.email || "Not available"}
                </dd>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center"
              >
                <dt className="flex items-center text-sm font-medium text-[#114B5F]">
                  <Shield className="mr-2 h-5 w-5 flex-shrink-0 text-[#114B5F]" />
                  Account Type
                </dt>
                <dd className="ml-auto text-sm text-[#114B5F]">Standard</dd>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center"
              >
                <dt className="flex items-center text-sm font-medium text-[#114B5F]">
                  <CreditCard className="mr-2 h-5 w-5 flex-shrink-0 text-[#114B5F]" />
                  Subscription
                </dt>
                <dd className="ml-auto text-sm text-[#114B5F]">Active</dd>
              </motion.div>
            </dl>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-[#D8DBE2] px-4 py-5 sm:px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <Button
                className="w-full bg-[#114B5F] text-white hover:bg-[#114B5F]/90"
                onClick={() => router.push("/pages/store")}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Go to Store
              </Button>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full border-[#114B5F] text-[#114B5F] hover:bg-[#114B5F] hover:text-white"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-5 w-5" />
                )}
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

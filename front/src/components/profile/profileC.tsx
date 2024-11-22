"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

export default function ProfilePageComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: colors.background }}>
        <Loader2 className="h-12 w-12 animate-spin" style={{ color: colors.accent }} />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-screen flex-col items-center justify-center px-4"
        style={{ backgroundColor: colors.background, color: colors.text }}
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-3xl font-bold"
        >
          Access Denied
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center"
        >
          Please sign in to view your profile.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push("/login")}
            style={{ backgroundColor: colors.accent, color: colors.background }}
            className="hover:opacity-90 transition-opacity duration-300"
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
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <Card className="overflow-hidden shadow-xl" style={{ backgroundColor: colors.background, color: colors.text }}>
          <CardHeader className="relative pb-24 pt-6">
            <div className="absolute inset-0" style={{ backgroundColor: colors.accent }}>
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    `radial-gradient(circle, ${colors.accent}33 0%, ${colors.accent}00 100%)`,
                    `radial-gradient(circle, ${colors.accent}66 0%, ${colors.accent}00 100%)`,
                    `radial-gradient(circle, ${colors.accent}33 0%, ${colors.accent}00 100%)`,
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
                  <User className="h-12 w-12" style={{ color: colors.background }} />
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold" style={{ color: colors.background }}>
                {session.user?.name || "User"}
              </h2>
              <p className="text-sm font-medium" style={{ color: `${colors.background}CC` }}>
                {session.user?.email || "No email provided"}
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="px-4 py-5 sm:p-6">
            <dl className="space-y-6">
              <AnimatePresence>
                {["email", "accountType", "subscription"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <dt className="flex items-center text-sm font-medium" style={{ color: colors.accent }}>
                      {item === "email" && (
                        <Mail className="mr-2 h-5 w-5 flex-shrink-0" style={{ color: colors.accent }} />
                      )}
                      {item === "accountType" && (
                        <Shield className="mr-2 h-5 w-5 flex-shrink-0" style={{ color: colors.accent }} />
                      )}
                      {item === "subscription" && (
                        <CreditCard className="mr-2 h-5 w-5 flex-shrink-0" style={{ color: colors.accent }} />
                      )}
                      {item === "email"
                        ? "User ID"
                        : item === "accountType"
                        ? "Account Type"
                        : "Subscription"}
                    </dt>
                    <dd className="ml-auto text-sm" style={{ color: colors.text }}>
                      {item === "email"
                        ? session.user?.email || "Not available"
                        : item === "accountType"
                        ? "Standard"
                        : "Active"}
                    </dd>
                  </motion.div>
                ))}
              </AnimatePresence>
            </dl>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-4 py-5 sm:px-6" style={{ backgroundColor: `${colors.accent}33` }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <Button
                className="w-full transition-colors duration-300 hover:opacity-90"
                onClick={() => router.push("/pages/store")}
                style={{ backgroundColor: colors.accent, color: colors.background }}
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
                className="w-full transition-colors duration-300"
                onClick={handleSignOut}
                disabled={isSigningOut}
                style={{ borderColor: colors.accent, color: colors.accent }}
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


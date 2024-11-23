"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (status === "unauthenticated" || !session?.user?.isAdmin) {
      router.push("/login"); // Redirect to login if not authenticated or not an admin
    } else {
      fetchUsers();
    }
  }, [session, status, router]);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  const makeAdmin = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/make-admin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Failed to make user admin");
      }
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.isAdmin ? "Admin" : "User"}</p>
              </div>
              {!user.isAdmin && (
                <Button onClick={() => makeAdmin(user._id)}>Make Admin</Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

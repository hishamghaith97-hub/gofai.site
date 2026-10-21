"use server";

import { ObjectId } from "mongodb";
import { signOut } from "@/auth";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

// Deletes every session this user has, so all their browsers and devices are signed out.
export async function signOutEverywhereAction() {
  const user = await getCurrentUser();
  await getDb().collection("sessions").deleteMany({ userId: new ObjectId(user.id) });
  await signOut({ redirectTo: "/login" });
}

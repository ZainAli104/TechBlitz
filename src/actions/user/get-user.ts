'use server'
import { createClient as createServerClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";

/**
 * Get the user from the server - used in api routes, server componets & server actions
 * 
 * @returns 
 */
export const getUserFromSession = 
  async () => {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore);
    return supabase?.auth?.getUser();
  }

export const getUserFromDb = 
  async (userId: string) => {
    if (!userId) return null;
    return await prisma.users.findUnique({
      where: {
        uid: userId
      }
    })
  }


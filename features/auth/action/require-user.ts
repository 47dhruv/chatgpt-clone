"user server"

import { prisma } from "@/lib/db/db"
import { auth } from "@clerk/nextjs/server"

export async function requireUser() {
    const {userId}= await auth.protect();

    const user = await prisma.user.findUnique({
        where:{clerkId:userId},

    });

    if (!user) {
        throw Error("user not found complete Onboarding first");

    }
    return user
}
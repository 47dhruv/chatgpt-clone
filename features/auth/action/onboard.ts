"use server"
import { currentUser } from "@clerk/nextjs/server"
import {prisma} from "@/lib/db/db"
import {User} from "@/lib/generated/prisma/client"


export  async function onBoard(){
    const clerkUser= await currentUser();
    if (!clerkUser) {
        throw Error("unauthorize")

    }
    const email= clerkUser.emailAddresses[0]?.emailAddress ?? null
    return prisma.user.upsert({
        where:{clerkId:clerkUser.id},
        create:{
            clerkId:clerkUser.id,
            email,
            name:clerkUser.username ?? null,
            imageUrl:clerkUser.imageUrl,
            
        },
        update:{
            email:email,
            name:clerkUser.username ?? null,
            imageUrl:clerkUser.imageUrl,
              
        }
    })
}
"use server";

import { z } from "zod";
import { db } from "./modules/db";
import { redirect } from "next/navigation";

const CreateAccountSchema = z.object({
    name: z.string().min(1).max(40),
  });

export const createAccount = async (rawData: FormData) => {
    const data = CreateAccountSchema.parse({
      name: rawData.get("name"),
    });
  
    const account = await db.account.create({
      data,
    });
  
    redirect(`/accounts/${account.id}`);
  };
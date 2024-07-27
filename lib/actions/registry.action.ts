"use server";

import Registry from "@/database/registry.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { RegisterParams } from "./shared.types";

export async function register(params: RegisterParams) {
  try {
    connectToDatabase();

    const { address, path } = params;

    await Registry.create({
      address,
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllRegistrants() {
  try {
    connectToDatabase();

    const registrants = await Registry.find({}).sort({ registeredAt: -1 });

    return { registrants };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
// Cannot use this function directly as it requires the user wallet address which can only be obtained from the client side
export async function isUserRegistered(params: any) {
  try {
    connectToDatabase();

    const { userAddress } = params;

    const registrant = await Registry.findOne({ address: userAddress });

    if (!registrant) {
      console.log("User not registered");
    } else console.log("User registered");

    return registrant;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function exampleTemplate() {
    try {
      connectToDatabase()

    } catch (e) {
      console.log(e);
      throw e;
    }
}


export const updateUserStickers = async (userAddress: string, stickers: { id: number, count: number }[]) => {
  try {
    const response = await fetch('/api/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: userAddress, stickers })
    });

    if (!response.ok) {
      throw new Error(`Error updating stickers: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update stickers:', error);
    throw error;
  }
};


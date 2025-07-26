"use server";

import { prisma } from "@/lib/prisma";

export async function incrementUserDownloadQuantity(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { downloadQuantity: { increment: 1 } },
    });
  } catch (error) {
    console.error("Erro ao incrementar downloads do usuário:", error);
    throw new Error("Falha ao atualizar a contagem de downloads");
  }
}

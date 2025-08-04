// function prisma to change the user plan to PRO

import { User } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function changeUserPlanToPro(userId: string): Promise<User | null> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { plan: 'PRO' },
    });

    return user;
  } catch (error) {
    console.error('Error changing user plan to PRO:', error);
    return null;
  }
}
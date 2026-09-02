"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("邮箱和密码必填");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("该邮箱已注册");
  }

  const hashed = await bcrypt.hash(password, 10);

  // 第一个注册用户自动设为管理员，方便演示
  const userCount = await prisma.user.count();
  const role = userCount === 0 ? "ADMIN" : "USER";

  await prisma.user.create({
    data: {
      name: name || email.split("@")[0],
      email,
      password: hashed,
      role,
    },
  });
}

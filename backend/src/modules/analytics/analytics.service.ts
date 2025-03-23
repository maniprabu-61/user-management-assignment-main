import { Injectable } from "@nestjs/common";
import { subDays } from "date-fns";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get User Analytics Count
  async getUserAnalytics() {
    const totalUsers = await this.prisma.user.count();

    const newUsers = await this.prisma.user.count({
      where: { createdAt: { gte: subDays(new Date(), 30) } }, // Last 30 days
    });

    const activeUsers = await this.prisma.user.count({
      where: { lastLoginAt: { gte: subDays(new Date(), 7) } }, // Active in last 7 days
    });

    return { totalUsers, newUsers, activeUsers };
  }

  // ✅ Get User Sign-up Trends
  async getUserSignupTrends() {
    const users = await this.prisma.user.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    return users;
  }

  // ✅ Get User Activity (Recent Logins)
  async getUserActivity() {
    const activity = await this.prisma.user.findMany({
      select: { email: true, lastLoginAt: true },
      orderBy: { lastLoginAt: "desc" },
      take: 10, // Last 10 logins
    });

    return activity;
  }
}

import { Controller, Get, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RoleGuard } from "../auth/role.guard";
@Controller("analytics")
@UseGuards(JwtAuthGuard, RoleGuard) // ✅ Protect routes with JWT & RBAC
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get("users/count")
  getUserCount() {
    return this.analyticsService.getUserAnalytics();
  }

  @Get("users/trends")
  getUserTrends() {
    return this.analyticsService.getUserSignupTrends();
  }

  @Get("users/activity")
  getUserActivity() {
    return this.analyticsService.getUserActivity();
  }
}

import { Controller, Get, Query } from "@nestjs/common";
import { SteamService } from "./steam.service";

@Controller("steam")
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get("download-demo")
  async downloadDemo(@Query("code") shareCode: string) {
    if (!shareCode) return { error: "Missing share code" };
    const result = await this.steamService.getMatchInfoFromShareCode(shareCode);
    return { result };
  }
}

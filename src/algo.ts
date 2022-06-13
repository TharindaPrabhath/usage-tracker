import { User } from "./types";

import dayjs from "dayjs";

class UsageTracker {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  private getCycles(): number {
    const now = dayjs();
    const createdAt = dayjs(this.user.createdAt);
    if (createdAt.isAfter(now)) throw new Error("createdAt is after now");
    const cycleDuration = this.user.cycleDuration;
    const diff = now.diff(createdAt, "seconds");
    const cycles = diff / cycleDuration;
    return cycles;
  }

  /**
   *
   * @returns factor => 0 < factor <= 1
   */
  private getFactor(): number {
    const cycles = this.getCycles();
    if (cycles === 0) return 1;
    const cyclesUpperVal = Math.ceil(cycles);
    if (cyclesUpperVal === cycles) return 1;
    return cyclesUpperVal - cycles;
  }

  init() {
    return {
      cycles: this.getCycles(),
      factor: this.getFactor(),
    };
  }
}

export default UsageTracker;

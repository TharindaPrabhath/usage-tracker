import UsageTracker from "./algo";
import { User } from "./types";

const user: User = {
  cycleDuration: 3 * 30 * 86400, // 1 month in seconds,
  createdAt: new Date(2022, 5, 13, 16, 46),
};

const tracker = new UsageTracker(user);
console.log("Tracker", tracker.init());

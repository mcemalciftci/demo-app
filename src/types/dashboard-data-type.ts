export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
};
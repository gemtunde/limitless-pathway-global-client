import { Badge } from "@/components/ui/badge";

type BadgeVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "primary"
  | null;

export const StatusBadge = ({ status }: { status: string }) => {
  const getBadgeVariant = (status: string): BadgeVariant => {
    switch (status.toLowerCase()) {
      case "active":
        return "primary";
      case "expired":
      case "inactive":
        return "destructive";
      default:
        return "outline";
    }
  };

  return <Badge variant={getBadgeVariant(status)}>{status}</Badge>;
};

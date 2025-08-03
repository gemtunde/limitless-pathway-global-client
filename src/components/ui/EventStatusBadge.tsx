import { Badge } from "@/components/ui/badge";

type BadgeVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "primary"
  | null;

export const EventStatusBadge = ({ status }: { status: string }) => {
  const getBadgeVariant = (status: string): BadgeVariant => {
    switch (status.toLowerCase()) {
      case "completed":
        return "primary";
      case "published":
        return "secondary";
      case "cancelled":
      case "draft":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Badge variant={getBadgeVariant(status)}>
      {status === "published" ? "In Progress" : status}
    </Badge>
  );
};

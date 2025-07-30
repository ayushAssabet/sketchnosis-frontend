import { Plus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const LoadingButton = ({
  isUpdate,
  isLoading,
  title,
  className,
}: {
  isUpdate: boolean;
  isLoading: boolean;
  title: string;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          {isUpdate ? `Updating ${title}...` : `Adding ${title}...`}
        </>
      ) : (
        <>
          {!isUpdate && <Plus className="h-4 w-2" />}
          {isUpdate ? `Update ${title}` : `Add ${title}`}
        </>
      )}
    </Button>
  );
};

export default LoadingButton;

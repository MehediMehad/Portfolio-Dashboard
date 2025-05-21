import Spinner from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center py-24">
      <Spinner size="xl" text="Loading blog posts..." />
    </div>
  );
}

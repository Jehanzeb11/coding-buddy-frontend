import LottieLoader from "@/components/ui/LottieLoader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <LottieLoader width={350} height={350} />
    </div>
  );
}

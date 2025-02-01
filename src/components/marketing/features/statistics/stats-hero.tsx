import { Button } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ArrowDown, ChevronRight } from "lucide-react";

export default function StatsHero() {
  return (
    <section className="pt-32 lg:pt-52 pb-36 relative">
      <div className="mt-28 z-10 absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000] to-transparent pointer-events-none"></div>

      <div className="flex flex-col gap-y-6 items-center z-20 relative">
        <h1 className="text-5xl lg:text-7xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 text-center py-1.5">
          Track coding progress with <br /> ease.
        </h1>
        <p className="text-gray-400 max-w-xl text-center text-sm md:text-base font-onest">
          Track your coding journey with detailed insights, monitor your coding
          performance and visualize your growth with interactive charts with our
          coding improvements tools.
        </p>
        <div className="mt-2 flex gap-4">
          <Button variant="default" href="#statistics-report">
            Learn more
            <ArrowDown size={16} className="ml-2" />
          </Button>
          <Button
            href="/signup?src=features-statistics"
            className="font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
          >
            Try it now
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "absolute inset-0 pt-44 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="z-10 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
    </section>
  );
}

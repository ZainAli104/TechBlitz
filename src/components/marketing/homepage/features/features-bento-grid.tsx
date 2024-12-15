import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';
import RoadmapFeatureBox from './roadmap-feature-box';
import Link from 'next/link';
import DailyQuestionBox from './daily-question-box';
import LeaderboardBentoBox from './leaderboard-bento-box';
import ProgressionBentoBox from './progression-box';

const cardClasses = 'border border-black-50 p-6 rounded-lg';

export default function FeaturesBentoGrid() {
  // if on prod, make all links be disabled go to '/'
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';

  return (
    <section className="pt-10 lg:pt-28 pb-10 md:pb-20 flex flex-col gap-y-7 relative">
      <div className="flex flex-col gap-y-1 items-center text-center">
        <div className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Features
          </span>
        </div>
        <h1 className="text-2xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          We make Software engineering easy{' '}
        </h1>
        <span className="text-sm md:text-base text-gray-400 max-w-3xl">
          Elevate your coding skills with TechBlitz: AI-powered learning paths,
          daily challenges, competitive leaderboards, and a vast question bank
          tackling real-world software problems. Your all-in-one platform for
          continuous growth and career advancement in tech.
        </span>
      </div>
      <div className="min-h-[1400px] md:min-h-[1000px] lg:min-h-[700px] rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black-400 rounded-lg">
          <Link
            href={isProd ? '' : '/features/roadmap'}
            className={cn(
              'h-80 col-span-full lg:col-span-2 relative overflow-hidden group flex flex-col sm:flex-row gap-5',
              cardClasses
            )}
          >
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-y-1 relative max-w-sm">
                <h6 className="text-2xl text-gradient from-white to-white/55">
                  AI Powered Progression Paths
                </h6>
                <p className="text-xs text-gray-400">
                  Personalized learning paths tailored to your goals and skill
                  level.
                </p>
              </div>
              <Button
                variant="secondary"
                className="z-10 relative gap-x-2 items-center w-fit font-onest hidden md:flex"
              >
                Learn more{' '}
                <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
              </Button>
            </div>
            <RoadmapFeatureBox />
            <Grid
              size={20}
              position="bottom-left"
            />
          </Link>
          <Link
            href={isProd ? '' : '/features/progress-tracking'}
            className={cn(
              'h-[390px] lg:h-80 flex flex-col justify-between group overflow-hidden',
              cardClasses
            )}
          >
            <div className="flex flex-col gap-y-4 relative">
              <div className="flex flex-col gap-y-1">
                <h6 className="text-2xl text-gradient from-white to-white/55">
                  Progress tracking
                </h6>
                <p className="text-xs text-gray-400">
                  Track your progress and use AI to analysis your coding habits.
                </p>
              </div>
              <div className="w-full h-fit flex items-center justify-center">
                <ProgressionBentoBox />
              </div>
            </div>
          </Link>
          <Link
            href={isProd ? '' : '/features/leaderboard'}
            className={cn('relative overflow-hidden group', cardClasses)}
          >
            <LeaderboardBentoBox />
            <div className="flex flex-col gap-y-1">
              <h6 className="text-2xl text-gradient from-white to-white/55">
                Leaderboard
              </h6>
              <p className="text-xs text-gray-400">
                Compete with other developers and see how you stack up against
                them!
              </p>
            </div>
          </Link>
          <Link
            href={isProd ? '' : '/features/daily-questions'}
            className={cn(
              'col-span-full lg:col-span-2 group overflow-hidden',
              cardClasses
            )}
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-1 h-fit">
                <h6 className="text-2xl text-gradient from-white to-white/55">
                  Daily questions
                </h6>
                <p className="text-xs text-gray-400">
                  Sharpen your skills with practical, industry-relevant coding
                  challenges.
                </p>
              </div>
              <Button
                variant="accent"
                className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
              >
                Learn more{' '}
                <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
              </Button>
            </div>
            <div className="relative">
              <DailyQuestionBox />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

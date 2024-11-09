import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { Skeleton } from '../ui/skeleton';
import { DailyStreakChart } from './daily-streak-chart';
import { ArrowRight } from 'lucide-react';

import { DAILY_STREAK } from '@/utils/constants/daily-streak';

import { getTodaysQuestion } from '@/actions/questions/get-today';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';

import TodaysLeaderboardBentoBox from '@/components/leaderboard/bento-box';
import { getUserFromSession } from '@/actions/user/get-user';
import { Button } from '../ui/button';
import AllQuestionsDashboardBentoBox from '../dashboard/all-questions-bento-box';
import TodaysQuestionBentoBox from './todays-question-bento-box';

export default async function DashboardBentoGrid() {
  const todaysQuestion = await getTodaysQuestion();

  const { data: user } = await getUserFromSession();

  // we need the user in order to continue. The user should be authed
  // in the middleware, so this should (theoretically) never happen.
  if (!user || !user.user?.id) return;

  const userStreak = await getUserDailyStats(user?.user?.id);

  /**
   *  list of items that will be displayed in the bento grid. The class
   *  name is used to determine the size of the grid item.
   */
  const items = [
    {
      title: "Today's Question!",
      description: (
        <Button variant="accent" className="flex gap-x-1 items-center">
          Answer now <ArrowRight className="size-3" />
        </Button>
      ),
      header: todaysQuestion && (
        <TodaysQuestionBentoBox question={todaysQuestion} />
      ),
      className: 'md:col-span-1 text-white',
      href: `/question/${todaysQuestion?.uid}`,
    },
    {
      header: <AllQuestionsDashboardBentoBox />,
      className: 'md:col-span-2 text-white',
      href: '/questions',
    },
    {
      title: <div>Today's Leaderboard</div>,
      description: (
        <Button variant="accent" className="flex gap-x-1 items-center">
          View the full list <ArrowRight className="size-3" />
        </Button>
      ),
      header: <TodaysLeaderboardBentoBox todaysQuestion={todaysQuestion} />,
      className: 'md:col-span-1 md:row-span-2 text-white h-full',
      href: '/leaderboard/today',
    },
    {
      title: 'Roadmap',
      description: 'Check out what we have planned for the future!',
      header: <Skeleton />,
      className: 'md:col-span-2 text-white',
    },
    {
      title: `${userStreak?.totalDailyStreak} day streak!`,
      description: DAILY_STREAK,
      header: userStreak && (
        <div className="flex size-full items-center justify-center h-[180px]">
          <DailyStreakChart userStreakData={userStreak} />
        </div>
      ),
      className: 'md:col-span-1 text-white',
    },
  ];

  return (
    <BentoGrid className="grid-rows-[auto_auto_auto] md:grid-rows-[repeat(2,minmax(0,1fr))] h-full">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}

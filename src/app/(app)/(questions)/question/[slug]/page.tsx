import { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

const QuestionCard = dynamic(
  () => import('@/components/app/questions/single/layout/question-card'),
  {
    ssr: false,
  }
);

const CodeDisplayWrapper = dynamic(
  () => import('@/components/app/questions/single/layout/code-display-wrapper'),
  {
    ssr: false,
  }
);
const CodeEditor = lazy(() => import('@/components/app/questions/code-editor/editor'));
const TestCaseSection = lazy(
  () => import('@/components/app/questions/code-editor/test-case-section')
);

const TourStartModal = lazy(() => import('@/components/app/shared/question/tour-start-modal'));
const PremiumContentWrapper = lazy(
  () => import('@/components/app/shared/question/premium-content-wrapper')
);

const AiQuestionHelp = dynamic(
  () => import('@/components/app/questions/single/layout/ai-question-help'),
  {
    ssr: false,
    loading: () => <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />,
  }
);
const ChangeCodeTheme = dynamic(
  () => import('@/components/app/questions/single/layout/change-code-theme'),
  {
    ssr: false,
    loading: () => <EditorIcon />,
  }
);
const ExpandedCodeModal = dynamic(
  () => import('@/components/app/questions/single/layout/expanded-code-modal'),
  {
    ssr: false,
    loading: () => <Expand className="size-4 text-gray-500" />,
  }
);

import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import ResizableLayout from '@/components/ui/resizable-layout';

import { getQuestion } from '@/utils/data/questions/get';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { getRandomQuestion } from '@/utils/data/questions/get-random';

import { useUserServer } from '@/hooks/use-user-server';
import LoadingSpinner from '@/components/ui/loading';
import { Expand, StarsIcon } from 'lucide-react';
import EditorIcon from '@/components/ui/icons/editor';

export default async function TodaysQuestionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [user, question, totalSubmissions, nextQuestion] = await Promise.all([
    useUserServer(),
    getQuestion('slug', slug),
    getQuestionStats('slug', slug),
    getRandomQuestion({
      identifier: 'slug',
      currentQuestionSlug: slug,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const questionPromise = getQuestion('slug', slug);

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <QuestionCard
          questionPromise={questionPromise}
          totalSubmissions={totalSubmissions}
          user={user}
          nextQuestion={nextQuestion}
          identifier="slug"
        />
      </Suspense>
    </div>
  );

  const rightContent = (
    <div
      className={`hidden lg:flex flex-col gap-4 p-3 lg:pl-1.5 h-full ${
        question?.testCases?.length ? 'lg:pb-1.5' : 'lg:pb-3'
      }`}
    >
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative h-full overflow-y-auto scrollable-element"
      >
        <div className="px-4 py-[18px] text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          <AiQuestionHelp question={question} user={user} questionType="regular" />
          <ChangeCodeTheme user={user} />
          {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
        </div>
        <Separator className="bg-black-50" />
        {question?.questionType === 'CODING_CHALLENGE' ? <CodeEditor /> : <CodeDisplayWrapper />}
      </div>
    </div>
  );

  const rightBottomContent = question?.testCases?.length ? <TestCaseSection /> : null;

  return (
    <PremiumContentWrapper>
      <TourStartModal user={user} />
      <ResizableLayout
        leftContent={leftContent}
        rightTopContent={rightContent}
        rightBottomContent={rightBottomContent}
        initialLeftWidth={50}
        initialRightTopHeight={question?.testCases?.length ? 70 : 100}
      />
    </PremiumContentWrapper>
  );
}

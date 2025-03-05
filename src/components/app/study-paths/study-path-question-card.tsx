import { Question } from '@/types/Questions';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Circle, Star } from 'lucide-react';
import { useUserServer } from '@/hooks/use-user-server';
import Lock from '@/components/ui/icons/lock';
import Check from '@/components/ui/icons/check';
import ERemove from '@/components/ui/icons/e-remove';

export default async function StudyPathQuestionCard({
  questionData,
  href,
  className,
  index,
  isNextQuestion,
}: {
  questionData: Question;
  href: string;
  className?: string;
  index?: number;
  isNextQuestion?: boolean;
}) {
  const iconSize = '32';

  const user = await useUserServer();

  //const title = questionData?.title || questionData?.question;
  const userCanAccess = user?.userLevel === 'PREMIUM' || !questionData?.isPremiumQuestion;

  // Determine the status for visual styling
  const isCompleted = questionData.userAnswers && questionData.userAnswers.length > 0;
  const isCorrect = isCompleted && questionData?.userAnswers?.[0]?.correctAnswer;

  // Get wrapper border color based on status
  const getWrapperBorderColor = () => {
    if (!userCanAccess) return 'border-yellow-500';
    if (isCorrect) return 'border-green-500';
    if (isCompleted && !isCorrect) return 'border-red-500';
    if (isNextQuestion) return 'border-accent';
    return 'border-transparent';
  };

  // Get wrapper hover border color
  const getWrapperHoverBorderColor = () => {
    if (!userCanAccess) return 'group-hover:!border-yellow-500';
    if (isCorrect) return 'group-hover:!border-green-500';
    if (isCompleted && !isCorrect) return 'group-hover:!border-red-500';
    return 'group-hover:!border-accent';
  };

  return (
    <div className="relative group perspective-1000 flex items-center justify-center">
      {/* Level indicator (optional) */}
      {index !== undefined && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-black text-xs font-bold px-2 py-0.5 rounded-full border border-black-100 text-white">
          {index + 1}
        </div>
      )}

      {/* Wrapper element with colored border */}
      <div
        className={cn(
          'absolute -inset-4 rounded-full border-2 transition-all duration-300 transform-gpu',
          getWrapperBorderColor(),
          isCorrect && 'animate-pulse-slow',
          isNextQuestion && 'animate-pulse',
          'group-hover:rotate-2 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/20',
          'group-active:rotate-1 group-active:scale-95'
        )}
      />

      {/* The card itself */}
      <Link
        href={userCanAccess ? href : '#'}
        key={questionData.uid}
        className={cn(
          'w-24 h-[86px] justify-center items-center flex flex-col gap-y-5 bg-[#191919] duration-300 p-5 rounded-full group relative transition-all mb-2',
          'transform-gpu',
          'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-black-100/30 before:to-transparent before:opacity-70',
          'after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-t after:from-black-100/30 after:to-transparent after:opacity-30 after:translate-y-1/2',
          'hover:translate-y-[1px]',
          'active:translate-y-[1px] active:rotate-1 active:scale-95',
          'transform-style-3d',
          'backface-visibility-hidden',
          'cursor-pointer select-none',
          'active:translate-y-2 active:[box-shadow:0_0px_0_0_#191919,0_0px_0_0_#191919]',
          'active:border-b-[0px]',
          'transition-all duration-150 [box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]'
        )}
      >
        <div className="flex w-full items-center justify-center gap-4 md:gap-5 relative z-10">
          <div
            className={cn(
              'flex items-center justify-center rounded-full transition-all',
              isCorrect && 'animate-pulse-slow'
            )}
          >
            {!userCanAccess ? (
              <div className="relative animate-pulse-slow drop-shadow-md">
                <Lock height="40" width="40" />
              </div>
            ) : questionData.userAnswers && questionData.userAnswers.length > 0 ? (
              questionData.userAnswers[0].correctAnswer ? (
                <div className="relative">
                  <Check fill="green" strokewidth={2} height={iconSize} width={iconSize} />
                  <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </div>
              ) : (
                <div className="relative">
                  <ERemove fill="red" strokewidth={2} height={iconSize} width={iconSize} />
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </div>
              )
            ) : (
              <Circle className="flex-shrink-0 size-6 text-black-50 group-hover:text-accent transition-colors drop-shadow-md" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

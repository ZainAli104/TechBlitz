import { Question } from '@/types/Questions';
import MultipleChoiceLayoutClient from './layout.client';
import { QuestionAnswer } from '@/types/QuestionAnswers';

// Mock implementation for Storybook
interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: QuestionAnswer[];
  createdAt?: Date;
  updatedAt?: Date;
  title?: string | null;
  description?: string | null;
  dailyQuestion?: boolean;
  customQuestion?: boolean;
  difficulty?: string;
  slug?: string | null;
  slugGenerated?: boolean;
  questionType?: string;
  [key: string]: any;
}

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  previousQuestion: string | null | undefined;
  nextQuestion: string | null | undefined;
}

export default function MultipleChoiceLayout({
  question,
  nextAndPreviousQuestion,
}: {
  question: Question | QuestionMock;
  nextAndPreviousQuestion: NavigationData | null;
}) {
  return (
    <MultipleChoiceLayoutClient
      question={question}
      nextAndPreviousQuestion={nextAndPreviousQuestion}
    >
      <div className="flex items-center justify-between mb-4 self-start">
        <h2 className="text-2xl font-bold text-white text-start">{question.question}</h2>
      </div>
    </MultipleChoiceLayoutClient>
  );
}

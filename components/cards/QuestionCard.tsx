import Link from 'next/link';
import RenderTag from '@/components/shared/RenderTag';
import Metric from '@/components/shared/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import { Suspense } from 'react';
import EditDeleteAction from '../shared/EditDeleteAction';
// import EditDeleteAction from '../shared/EditDeleteAction';

interface QuestionProps {
  _id: string;
  clerkId?: string | null;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    avatar: string;
  };
  upvotes: Array<object>;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  clerkId,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="card-wrapper light-border rounded-[10px] border p-9 dark:bg-opacity-80 dark:backdrop-blur-xl sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <p className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </p>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <Suspense>
              <EditDeleteAction type="question" itemId={JSON.stringify(_id)} />
            </Suspense>
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags &&  tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.avatar}
          alt="User"
          value={author.name}
          title={`• asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />
        <div className="flex gap-5">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title={"Votes"}
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(answers.length)}
            title={"Answers"}
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title={"Views"}
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

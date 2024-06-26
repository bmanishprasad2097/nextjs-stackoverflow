import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import Metric from "../shared/Metric";
import EditDeleteAction from "../shared/EditDeleteAction";
import { Suspense } from "react";

interface AnswerCardProps {
  _id: string;
  clerkId?: string | null;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    avatar: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  clerkId,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  const showActionButtons = clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper light-border rounded-[10px] border px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <p className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </p>
        </div>

        <SignedIn>
          {showActionButtons && (
            <Suspense>
              <EditDeleteAction type="answer" itemId={JSON.stringify(_id)} />
            </Suspense>
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.avatar}
          alt="Avatar"
          value={author.name}
          title={` • answered ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyle="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes)}
            title="Upvotes"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;

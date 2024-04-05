
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import NoResult from "@/components/shared/NoResult";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/cards/QuestionCard";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: string;
  clerkId?: string | null;
}

let result = {
  questions: [
    {
      "_id": "q789",
      "title": "How do I use context effectively in React?",
      "tags": [
        {
          "_id": "tag1",
          "name": "React"
        },
        {
          "_id": "tag2",
          "name": "Context API"
        }
      ],
      "author": {
        "_id": "auth1",
        "name": "Emma Stone",
        "picture": "",
      },
      "upvotes": ["user123", "user456", "user789"],
      "views": 150,
      "answers": [
        {
          "text": "To use context effectively, make sure you understand the Provider and Consumer pattern...",
          "authorId": "auth2",
          "createdAt": "2023-04-12T07:20:30.000Z"
        }
      ],
      "createdAt": new Date("2023-04-11T12:00:00.000Z"),
      "clerkId": "clerk123"
    },
    {
      "_id": "q1011",
      "title": "What's the best way to fetch data in a React component?",
      "tags": [
        {
          "_id": "tag3",
          "name": "React"
        },
        {
          "_id": "tag4",
          "name": "Fetch API"
        },
        {
          "_id": "tag5",
          "name": "Axios"
        }
      ],
      "author": {
        "_id": "auth3",
        "name": "John Doe",
        "picture": "",
      },
      "upvotes": ["user987", "user654", "user321"],
      "views": 245,
      "answers": [],
      "createdAt": new Date("2023-04-10T15:45:00.000Z"),
      "clerkId": null
    }
  ]
  
}

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route={"/"}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search for questions"
          otherClasses="flex-1"
        />
        {/* <Filter
          filter={HomePagefilter}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        /> */}
      </div>
      <HomeFilters/>

      <div className="mt-10 flex w-full flex-col gap-6">
        {
          //  @ts-ignore
          result.questions.length > 0 ? (
            result?.questions.map((item) => (
              <QuestionCard
                key={item._id}
                _id={item._id}
                title={item.title}
                tags={item.tags}
                author={item.author}
                upvotes={item.upvotes}
                answers={item.answers}
                views={item.views}
                createdAt={item.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="There are no question to show"
              description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
           involved! 💡"
              link="ask-question"
              linkTitle="Ask a Question"
            />
          )
        }
      </div>
      {/* <div className="mb-4 mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          // @ts-ignore
          isNext={result?.isNext}
        />
      </div> */}
    </>
  );
}

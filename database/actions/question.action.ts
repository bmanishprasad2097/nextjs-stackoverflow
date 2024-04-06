"use server"

import { getErrorMessage } from "@/lib/utils";
import { connectToDatabase } from "../dbConnection"
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import {
    CreateQuestionParams,
    DeleteQuestionParams,
    EditQuestionParams,
    GetQuestionByIdParams,
    GetQuestionsParams,
    QuestionVoteParams,
    RecommendedParams,
    ToggleSaveQuestionParams,
  } from "./shared.types";
  import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams) {
    const { page = 1, pageSize = 20, searchQuery, filter } = params;
    try {
        await connectToDatabase();

        const query: FilterQuery<typeof Question> = {};

        if (searchQuery) {
        query.$or = [
            { title: { $regex: new RegExp(searchQuery, "i") } },
            { content: { $regex: new RegExp(searchQuery, "i") } },
        ];
        }

        let sortOptions = {};

        switch (filter) {
        case "newest":
            sortOptions = { createdAt: -1 };
            break;
        case "frequent":
            sortOptions = { views: -1 };
            break;
        case "unanswered":
            query.answers = { $size: 0 };
            break;
        case "recommended":
            break;
        default:
            break;
        }

        const questions = await Question.find(query)
        .populate({ path: "tags", model: Tag })
        .populate({ path: "author", model: User })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sortOptions);

        const totalResults = await Question.countDocuments(query);

        const isNext = totalResults > (page - 1) * pageSize + questions.length;

        return {
        questions,
        isNext,
        totalResults,
        showingResults: questions.length,
        };
    } catch (error) {
        return {
        message: getErrorMessage(error),
        };
    }
}

export async function createQuestion(params : CreateQuestionParams){
    const { title , content , tags , author , path} = params;
    try{
        connectToDatabase();

        
        const question = Question.create({
            title,
            content,
            author,
        })

        const tagDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
              { name: { $regex: new RegExp(`^${tag}$`, "i") } },
              { $setOnInsert: { name: tag }, $push: { questions: (await question)._id } },
              { upsert: true, new: true }
            );
      
            tagDocuments.push(existingTag._id);
          }
      
          await Question.findByIdAndUpdate((await question)._id, {
            $push: { tags: { $each: tagDocuments } },
          });
      
          // Create an interaction record for the user's ask_question action
        //   await Interaction.create({
        //     user: author,
        //     action: "ask_question",
        //     question: question._id,
        //     tags: tagDocuments,
        //   });
      
          // Increment author's reputation by +5 for creating a question
          await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });
      
          return question;
        } catch (error) {
          return {
            message: getErrorMessage(error),
          };
        } finally {
          revalidatePath(path);
        }
}

export async function editQuestion(params: EditQuestionParams) {
    const { questionId, title, content, path } = params;
    try {
      await connectToDatabase();
  
      const question = await Question.findById(questionId);
  
      if (!question) {
        throw new Error("Question not found");
      }
  
      //Update the question
      question.title = title;
      question.content = content;
  
      await question.save();
  
      return question;
    } catch (error) {
      return {
        message: getErrorMessage(error),
      };
    } finally {
      revalidatePath(path);
    }
  }
import { Comments } from "./Comments";

export interface UserData {
    mainData: {
        userName: string;
        antiguedadYears: number | null;
    }[];
    skills: {
        skillName: string;
    }[];
    resumes: {
        resumeDescription: string;
        resumeTimeExperience: number;
        resumeTitleLabor: string;
        labors: {
            laborName: string;
        }[];
    }[];
    comments: Comments;
    tempData: {
        userTempDataActive: number;
        userTempDataLastUpdate: string;
    }[];
}
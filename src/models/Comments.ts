import { Comment } from "./Comment";
import { Data } from "./Data";

export interface Comments {
    data: Data[];
    fullComments: Comment[];
}
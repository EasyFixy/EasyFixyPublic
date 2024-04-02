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
    comments: {
        fullComments:{
            commentCalification: number;
            commentMessage: string;
            senderName: string;
        }[];
        data: {
            cantidadTotalComentariosEmployee: number;
            mediaCalificaciones: number;
        }[];
    }[];
    tempData: {
        userTempDataActive: number;
        userTempDataLastUpdate: string;
    }[];
}
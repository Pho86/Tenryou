import { ReactNode } from "react";

export type Events = {
    [key: string]: {
        banner:{
            EN:string
        };
        nameFull:{
            EN:string
        }
        id: number
        startAt:ReactNode
        endAt:ReactNode
        description:{
            EN:string
        }
    };
}

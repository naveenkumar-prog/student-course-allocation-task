import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "../services/student.service";

export const useUpdateStudent = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            data
        }:{
            id:number;
            data:any;
        })=>updateStudent(id,data),

        onSuccess:()=>{

            queryClient.invalidateQueries({
                queryKey:["students"]
            });

        }

    });

};
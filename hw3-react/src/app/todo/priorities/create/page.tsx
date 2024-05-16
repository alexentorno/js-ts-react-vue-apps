"use client"
import { IPriority } from "@/domain/IPriority";
import PostServise from "@/services/CRUD/PostService";
import { AppContext } from "@/state/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext } from "react";


export default function CreatePriority() {

    const router = useRouter();
    const { userInfo } = useContext(AppContext)!;


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const priorityName = formData.get('priorityName')?.toString() ?? "";
        const prioritySort = formData.get('prioritySort')?.toString() ?? "";

        try {
            const response = await PostServise.postPriority(userInfo!.token,
                {
                    priorityName: priorityName,
                    prioritySort: parseInt(prioritySort)
                } as IPriority);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                console.log(priorityName);
                router.push('/todo/priorities');
            }
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <>
            <h1>Create Priority</h1>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="control-label" htmlFor="priorityName">PriorityName</label>
                            <input className="form-control" type="text" id="priorityName" name="priorityName" />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="control-label" htmlFor="prioritySort">PrioritySort</label>
                            <input className="form-control" type="number" id="prioritySort" name="prioritySort" />
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Create" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Link href="/todo/priorities">Back to List</Link>
            </div>
        </>
    );
}

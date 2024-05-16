"use client"
import { ICategory } from "@/domain/ICategory";
import { IPriority } from "@/domain/IPriority";
import { ITask } from "@/domain/ITask";
import GetService from "@/services/CRUD/GetService";
import PostServise from "@/services/CRUD/PostService";
import { AppContext } from "@/state/AppContext";
import useCategoriesAndPriorities from "@/todo/useCategAndPrior";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";


export default function CreateTask() {

    const router = useRouter();

    const [taskCategories, taskPriorities] = useCategoriesAndPriorities();
    const { userInfo } = useContext(AppContext)!;

    interface HashMap {
        [key: string]: string;
    }

    function getKeyByValue(object: HashMap, value: string): string | undefined {
        return Object.keys(object).find(key => object[key] === value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const taskName = formData.get('taskName')?.toString() ?? "";
        const taskSort = formData.get('taskSort')?.toString() ?? "";
        const dueDt = formData.get('dueDt')?.toString() ?? "";
        const isCompleted = formData.get('isCompleted'); //convert to boolean???
        const isArchived = formData.get('isArchived'); //same
        const todoPriorityId = formData.get('todoPriorityId')?.toString() ?? "";
        const todoCategoryId = formData.get('todoCategoryId')?.toString() ?? "";

        try {
            console.log(isArchived)
            console.log(todoCategoryId)
            console.log(todoPriorityId)
            const response = await PostServise.postTask(userInfo!.token,
                {
                    taskName: taskName,
                    taskSort: parseInt(taskSort),
                    dueDt: dueDt,
                    isCompleted: true,
                    isArchived: true,
                    todoCategoryId: todoCategoryId,
                    todoPriorityId: todoPriorityId
                } as ITask);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                console.table(formData);
                router.push('/todo/tasks');
            }
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <>
            <h1>Create Task</h1>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="control-label" htmlFor="taskName">TaskName</label>
                            <input className="form-control" type="text" id="taskName" name="taskName" />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="control-label" htmlFor="taskSort">TaskSort</label>
                            <input className="form-control" type="number" id="taskSort" name="taskSort" />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="dueDt">DueDt</label>
                            <input className="form-control" type="datetime-local" id="dueDt" name="dueDt" />
                        </div>
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" id="isCompleted" name="isCompleted" value="true" /> IsCompleted
                            </label>
                        </div>
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" id="isArchived" name="isArchived" value="true" /> IsArchived
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="todoCategoryId">TodoCategoryId</label>
                            <select className="form-control" id="todoCategoryId" name="todoCategoryId">
                                {Object.entries(taskCategories).map(([id, name]) =>
                                    <option key={id} value={id}>{name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="todoPriorityId">TodoPriorityId</label>
                            <select className="form-control" id="todoPriorityId" name="todoPriorityId">
                                {Object.entries(taskPriorities).map(([id, name]) =>
                                    <option key={id} value={id}>{name}</option>
                                )}
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Create" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Link href="/todo/tasks">Back to List</Link>
            </div>
        </>
    );
}

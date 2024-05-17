"use client"

import { ITask } from "@/domain/ITask";
import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";
import formatDate from "../FormatDate";
import Link from "next/link";
import GetService from "@/services/CRUD/GetService";
import { ICategory } from "@/domain/ICategory";
import { IPriority } from "@/domain/IPriority";
import useCategoriesAndPriorities from "../useCategAndPrior";

export default function Tasks() {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const { userInfo } = useContext(AppContext)!;
    const [taskCategories, taskPriorities] = useCategoriesAndPriorities();


    const loadData = async () => {
        try {
            const response = await GetService.getTask(userInfo!.token)
            if (response.data) {
                setTasks(response.data);
            }
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { loadData() }, []);

    if (isLoading) return (<h1>Loading Tasks...</h1>);

    return (
        <>
            <h1>Tasks</h1>
            <p>
                <Link href="/todo/tasks/create">Create new</Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            TaskName
                        </th>
                        <th>
                            TaskSort
                        </th>
                        <th>
                            CreatedDt
                        </th>
                        <th>
                            DueDt
                        </th>
                        <th>
                            IsCompleted
                        </th>
                        <th>
                            IsArchived
                        </th>
                        <th>
                            TodoCategory
                        </th>
                        <th>
                            TodoPriority
                        </th>
                        <th>
                            SyncDt
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item) =>

                        <tr key={item.id}>
                            <td>
                                {item.taskName}
                            </td>
                            <td>
                                {item.taskSort}
                            </td>
                            <td>
                                {formatDate(item.createdDt)}
                            </td>
                            <td>
                                {formatDate(item.dueDt)}
                            </td>
                            <td>
                                {item.isCompleted}
                                <input className="check-box" type="checkbox" checked={item.isCompleted} disabled />
                            </td>
                            <td>
                                {item.isArchived}
                                <input className="check-box" type="checkbox" checked={item.isArchived} disabled />
                            </td>
                            <td>
                                {Object.entries(taskCategories).map(([id, name]) => (
                                    id === item.todoCategoryId.toString() ? name : null
                                ))}
                            </td>
                            <td>
                                {Object.entries(taskPriorities).map(([id, name]) => (
                                    id === item.todoPriorityId.toString() ? name : null
                                ))}
                            </td>
                            <td>
                                {formatDate(item.syncDt)}
                            </td>
                            <td>
                                <Link href={`/todo/tasks/edit/${item.id}`}>Edit</Link> |
                                <Link href={`/todo/tasks/details/${item.id}`}>Details</Link> |
                                <Link href={`/todo/tasks/delete/${item.id}`}>Delete</Link>
                            </td>
                        </tr>
                    )}


                </tbody>
            </table>
        </>
    );
}


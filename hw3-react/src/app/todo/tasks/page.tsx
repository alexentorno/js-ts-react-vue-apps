
"use client"

import { useContext, useEffect, useState } from "react";
import formatDate from "../FormatDate";
import { AppContext } from "@/state/AppContext";
import { ITask } from "@/domain/ITask";
import { GetService } from "@/services/DomainService";


export default function Priorities() {

    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const { userInfo, setUserInfo } = useContext(AppContext)!;

    const loadData = async () => {
        try {
            const response = await GetService.getTask(userInfo!.token);
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

    if (isLoading) return (<h1>Tasks - LOADING</h1>);

    return (
        <>
            <h1>Tasks</h1>

            <p>
                <a href="/create/">Create New</a>
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
                            DueDt
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
                                {formatDate(item.dueDt)}
                            </td>
                            <td>
                                <a href="/TodoCategories/Edit/57555e9f-f148-4ce4-489f-08dc554ca528">Edit</a> |
                                <a href="/TodoCategories/Details/57555e9f-f148-4ce4-489f-08dc554ca528">Details</a> |
                                <a href="/TodoCategories/Delete/57555e9f-f148-4ce4-489f-08dc554ca528">Delete</a>
                            </td>
                        </tr>
                    )}


                </tbody>
            </table>
        </>
    );
}


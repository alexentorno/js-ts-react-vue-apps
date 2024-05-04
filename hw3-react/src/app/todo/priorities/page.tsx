
"use client"

import { useContext, useEffect, useState } from "react";
import formatDate from "../FormatDate"
import { IPriority } from "@/domain/IPriority";
import { AppContext } from "@/state/AppContext";
import { GetService } from "@/services/DomainService";
import AutoLogin from "../autoLogin";

export default function Priorities() {
    //AutoLogin();
    const [isLoading, setIsLoading] = useState(true);
    const [priorities, setPriorities] = useState<IPriority[]>([]);
    const { userInfo, setUserInfo } = useContext(AppContext)!;


    const loadData = async () => {
        try {
            const response = await GetService.getPriority(userInfo!.token);
            if (response.data) {
                setPriorities(response.data);
            }
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { loadData() }, []);

    if (isLoading) return (<h1>Priorities - LOADING</h1>);

    return (
        <>
            <h1>Priorities</h1>

            <p>
                <a href="/create/">Create New</a>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            PriorityName
                        </th>
                        <th>
                            PrioritySort
                        </th>
                        <th>
                            SyncDt
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {priorities.map((item) =>
                        <tr key={item.id}>
                            <td>
                                {item.priorityName}
                            </td>
                            <td>
                                {item.prioritySort}
                            </td>
                            <td>
                                {formatDate(item.syncDt)}
                            </td>
                            <td>
                                <a href={`/TodoPriorities/Edit/${item.id}`}>Edit</a> |
                                <a href={`/TodoPriorities/Details/${item.id}`}>Details</a> |
                                <a href={`/TodoPriorities/Delete/${item.id}`}>Delete</a>
                            </td>
                        </tr>
                    )}


                </tbody>
            </table>
        </>
    );
}

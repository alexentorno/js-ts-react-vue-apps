"use client"

import { IPriority } from "@/domain/IPriority";
import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";
import formatDate from "../FormatDate";
import Link from "next/link";
import GetService from "@/services/CRUD/GetService";

export default function Priorities() {
    const [isLoading, setIsLoading] = useState(true);
    const [priority, setPriority] = useState<IPriority[]>([]);
    const { userInfo } = useContext(AppContext)!;


    const loadData = async () => {
        try {
            const response = await GetService.getPriority(userInfo!.token)
            if (response.data) {
                setPriority(response.data);
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
                <Link href="/todo/priorities/create">Create new</Link>
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
                    {priority.map((priority) =>

                        <tr key={priority.id}>
                            <td>
                                {priority.priorityName}
                            </td>
                            <td>
                                {priority.prioritySort}
                            </td>
                            <td>
                                {formatDate(priority.syncDt)}
                            </td>
                            <td>
                                <Link href={`/todo/priorities/edit/${priority.id}`}>Edit</Link> |
                                <Link href={`/todo/priorities/details/${priority.id}`}>Details</Link> |
                                <Link href={`/todo/priorities/delete/${priority.id}`}>Delete</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}


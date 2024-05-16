"use client"

import { ICategory } from "@/domain/ICategory";
import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";
import formatDate from "../FormatDate";
import Link from "next/link";
import GetService from "@/services/CRUD/GetService";

export default function Categories() {
    //AutoLogin();
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { userInfo, setUserInfo } = useContext(AppContext)!;


    const loadData = async () => {
        try {
            const response = await GetService.getCategory(userInfo!.token)
            if (response.data) {
                setCategories(response.data);
            }
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { loadData() }, []);

    if (isLoading) return (<h1>Categories - LOADING</h1>);

    return (
        <>
            <h1>Categories</h1>

            <p>
                <Link href="/todo/categories/create">Create new</Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            CategoryName
                        </th>
                        <th>
                            CategorySort
                        </th>
                        <th>
                            SyncDt
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item) =>

                        <tr key={item.id}>
                            <td>
                                {item.categoryName}
                            </td>
                            <td>
                                {item.categorySort}
                            </td>
                            <td>
                                {formatDate(item.syncDt)}
                            </td>
                            <td>
                                <Link href={`/todo/categories/edit/${item.id}`}>Edit</Link> |
                                <Link href={`/todo/categories/details/${item.id}`}>Details</Link> |
                                <Link href={`/todo/categories/delete/${item.id}`}>Delete</Link>
                            </td>
                        </tr>
                    )}


                </tbody>
            </table>
        </>
    );
}


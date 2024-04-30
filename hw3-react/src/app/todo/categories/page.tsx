"use client"

import { ICategory } from "@/domain/ICategory";
import CategoryService from "@/services/CategoryService";
import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";

export default function Categories() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { userInfo, setUserInfo } = useContext(AppContext)!;


    const loadData = async () => {
        const response = await CategoryService.getAll(userInfo!.token)
        if (response.data) {
            setCategories(response.data);
        }

        setIsLoading(false);
    };

    useEffect(() => { loadData() }, []);

    if (isLoading) return (<h1>Categories - LOADING</h1>);

    return (
        <>
            <h1>Categories</h1>

            <p>
                <a href="/TodoCategories/Create">Create New</a>
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

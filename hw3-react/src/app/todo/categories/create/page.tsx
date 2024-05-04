"use client"
import { ICategory } from "@/domain/ICategory";
import { PostServise } from "@/services/DomainService";
import { AppContext } from "@/state/AppContext";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";


export default function CreateCategory() {

    const router = useRouter();
    const { userInfo } = useContext(AppContext)!;


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const categoryName = formData.get('categoryName')?.toString() ?? "";
        const categorySort = formData.get('categorySort')?.toString() ?? "";

        try {
            const response = await PostServise.postCategory(userInfo!.token,
                {
                    categoryName: categoryName,
                    categorySort: parseInt(categorySort)
                } as ICategory);
            console.table(response);
            if (response.errors) {
                console.log(categoryName);
                console.log(categorySort);

                console.error(response.errors);
                // Handle errors
            } else {


                console.log(categoryName);
                router.push('/todo/categories');
            }
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    };

    return (
        <>
            <h1>Create</h1>
            <h4>Category</h4>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="control-label" htmlFor="categoryName">
                                CategoryName
                            </label>
                            <input className="form-control" type="text" id="categoryName" name="categoryName" />
                            <span className="text-danger field-validation-valid"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="categorySort">
                                CategorySort
                            </label>
                            <input className="form-control" type="number" id="categorySort" name="categorySort" />
                            <span className="text-danger field-validation-valid"></span>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <a href="/todo/categories">Back to List</a>
            </div>
        </>
    );
}

"use client"
import { useParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { ICategory } from '@/domain/ICategory';
import { AppContext } from '@/state/AppContext';
import FormatDateToCalendarForm from '@/todo/FormatDateToCalendarForm';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import GetService from '@/services/CRUD/GetService';
import PutService from '@/services/CRUD/PutService';



export default function EditCategoryPage() {
    const { id } = useParams();
    const router = useRouter();
    const { userInfo } = useContext(AppContext)!;
    const [category, setCategory] = useState<ICategory | null>(null); // State to store category data

    const loadData = async () => {
        try {
            const response = await GetService.getCategoryById(userInfo!.token, id.toString());
            if (response) {
                setCategory(response);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.table(userInfo)

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const categoryName = formData.get('categoryName')?.toString() ?? "";
        const categorySort = formData.get('categorySort')?.toString() ?? "";
        const id = formData.get('id')?.toString() ?? "";
        const syncDt = formData.get('syncDt')?.toString() ?? "";


        try {
            const response = await PutService.putCategory(userInfo!.token, id.toString(),
                {
                    id: id,
                    categoryName: categoryName,
                    categorySort: parseInt(categorySort),
                    syncDt: syncDt
                } as ICategory);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                console.table(e.currentTarget)
                router.push('/todo/categories');
            }
        } catch (error: any) {
            console.error(error);

        }
    };

    return (
        <div>
            <h1>Edit Category</h1>
            {category ? ( // Check if category data is available
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label className="control-label" htmlFor="categoryName">CategoryName</label>
                                    <input className="form-control" type="text" id="categoryName" name="categoryName" defaultValue={category.categoryName} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="categorySort">CategorySort</label>
                                    <input className="form-control" type="number" id="categorySort" name="categorySort" defaultValue={category.categorySort} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="syncDt">SyncDt</label>
                                    <input className="form-control" type="datetime-local" id="syncDt" name="syncDt" defaultValue={FormatDateToCalendarForm(category.syncDt)} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>

                                <div className="form-group">
                                    <input type="hidden" name="id" defaultValue={category.id} />
                                    <input type="submit" value="Save" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Link href="/todo/categories">Back to List</Link>
                    </div>
                </>

            ) : (
                <p>Loading...</p> // Render loading message while data is being fetched
            )}
        </div>
    );
};



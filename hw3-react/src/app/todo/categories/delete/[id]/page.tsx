"use client"
import { useParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { ICategory } from '@/domain/ICategory';
import { AppContext } from '@/state/AppContext';
import { useRouter } from "next/navigation";
import FormatDate from '@/todo/FormatDate';
import Link from 'next/link';
import DeleteService from '@/services/CRUD/DeleteService';
import GetService from '@/services/CRUD/GetService';


export default function DeleteCategoryPage() {
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

        e.preventDefault();


        try {
            const response = await DeleteService.deleteCategory(userInfo!.token, id.toString());

            if (response.errors) {
                console.error(response.errors);

            } else {

                router.push('/todo/categories');
            }
        } catch (error: any) {
            console.error(error);

        }
    };

    return (
        <div>
            <h1>Delete Category</h1>
            {category ? ( // Check if category data is available
                <>
                    <h3>Are you sure you want to delete this?</h3>
                    <div>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                CategoryName
                            </dt>
                            <dd className="col-sm-10" >
                                {category.categoryName}
                            </dd>
                            <dt className="col-sm-2">
                                CategorySort
                            </dt>
                            <dd className="col-sm-10">
                                {category.categorySort}
                            </dd>
                            <dt className="col-sm-2">
                                SyncDt
                            </dt>
                            <dd className="col-sm-10" >
                                {FormatDate(category.syncDt)}
                            </dd>
                        </dl>

                        <form onSubmit={handleSubmit}>
                            <input type="hidden" id="id" name="id" value={category.id} />
                            <input type="submit" value="Delete" className="btn btn-danger" /> |
                            <Link href="/todo/categories">Back to List</Link>
                        </form>
                    </div>
                </>

            ) : (
                <p>Loading...</p> // Render loading message while data is being fetched
            )}
        </div>
    );
};



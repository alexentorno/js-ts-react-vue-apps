"use client"
import { useParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/state/AppContext';
import { useRouter } from "next/navigation";
import FormatDate from '@/todo/FormatDate';
import Link from 'next/link';
import DeleteService from '@/services/CRUD/DeleteService';
import GetService from '@/services/CRUD/GetService';
import { IPriority } from '@/domain/IPriority';


export default function DeletePriorityPage() {
    const { id } = useParams();
    const router = useRouter();
    const { userInfo } = useContext(AppContext)!;
    const [priority, setPriority] = useState<IPriority | null>(null);

    const loadData = async () => {
        try {
            const response = await GetService.getPriorityById(userInfo!.token, id.toString());
            if (response) {
                setPriority(response);
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
            const response = await DeleteService.deletePriority(userInfo!.token, id.toString());

            if (response.errors) {
                console.error(response.errors);

            } else {

                router.push('/todo/priorities');
            }
        } catch (error: any) {
            console.error(error);

        }
    };

    return (
        <div>
            <h1>Delete Priority</h1>
            {priority ? (
                <>
                    <h3>Are you sure you want to delete this?</h3>
                    <div>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                PriorityName
                            </dt>
                            <dd className="col-sm-10" >
                                {priority.priorityName}
                            </dd>
                            <dt className="col-sm-2">
                                PrioritySort
                            </dt>
                            <dd className="col-sm-10">
                                {priority.prioritySort}
                            </dd>
                            <dt className="col-sm-2">
                                SyncDt
                            </dt>
                            <dd className="col-sm-10" >
                                {FormatDate(priority.syncDt)}
                            </dd>
                        </dl>

                        <form onSubmit={handleSubmit}>
                            <input type="hidden" id="id" name="id" value={priority.id} />
                            <input type="submit" value="Delete" className="btn btn-danger" /> |
                            <Link href="/todo/priorities">Back to List</Link>
                        </form>
                    </div>
                </>

            ) : (
                <p>Loading...</p> // Render loading message while data is being fetched
            )}
        </div>
    );
};



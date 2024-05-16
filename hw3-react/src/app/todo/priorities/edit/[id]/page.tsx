"use client"
import { useParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/state/AppContext';
import FormatDateToCalendarForm from '@/todo/FormatDateToCalendarForm';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import GetService from '@/services/CRUD/GetService';
import PutService from '@/services/CRUD/PutService';
import { IPriority } from '@/domain/IPriority';



export default function EditPriorityPage() {
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
        console.table(userInfo)

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const priorityName = formData.get('priorityName')?.toString() ?? "";
        const prioritySort = formData.get('prioritySort')?.toString() ?? "";
        const id = formData.get('id')?.toString() ?? "";
        const syncDt = formData.get('syncDt')?.toString() ?? "";


        try {
            const response = await PutService.putPriority(userInfo!.token, id.toString(),
                {
                    id: id,
                    priorityName: priorityName,
                    prioritySort: parseInt(prioritySort),
                    syncDt: syncDt
                } as IPriority);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                console.table(e.currentTarget)
                router.push('/todo/priorities');
            }
        } catch (error: any) {
            console.error(error);

        }
    };

    return (
        <div>
            <h1>Edit Priority</h1>
            {priority ? (
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label className="control-label" htmlFor="priorityName">PriorityName</label>
                                    <input className="form-control" type="text" id="priorityName" name="priorityName" defaultValue={priority.priorityName} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="prioritySort">PrioritySort</label>
                                    <input className="form-control" type="number" id="prioritySort" name="prioritySort" defaultValue={priority.prioritySort} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="syncDt">SyncDt</label>
                                    <input className="form-control" type="datetime-local" id="syncDt" name="syncDt" defaultValue={FormatDateToCalendarForm(priority.syncDt)} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>

                                <div className="form-group">
                                    <input type="hidden" name="id" defaultValue={priority.id} />
                                    <input type="submit" value="Save" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div >
                    <div>
                        <Link href="/todo/priorities">Back to List</Link>
                    </div>
                </>

            ) : (
                <p>Loading...</p> // Render loading message while data is being fetched
            )
            }
        </div >
    );
};



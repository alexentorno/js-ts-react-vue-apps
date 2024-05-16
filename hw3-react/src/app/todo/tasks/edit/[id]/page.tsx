"use client"
import { useParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { ITask } from '@/domain/ITask';
import { AppContext } from '@/state/AppContext';
import FormatDateToCalendarForm from '@/todo/FormatDateToCalendarForm';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import GetService from '@/services/CRUD/GetService';
import PutService from '@/services/CRUD/PutService';



export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const { userInfo } = useContext(AppContext)!;
    const [task, setTask] = useState<ITask | null>(null);

    const loadData = async () => {
        try {
            const response = await GetService.getTaskById(userInfo!.token, id.toString());
            if (response) {
                setTask(response);
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
        const taskName = formData.get('taskName')?.toString() ?? "";
        const taskSort = formData.get('taskSort')?.toString() ?? "";
        const id = formData.get('id')?.toString() ?? "";
        const syncDt = formData.get('syncDt')?.toString() ?? "";


        try {
            const response = await PutService.putTask(userInfo!.token, id.toString(),
                {
                    id: id,
                    taskName: taskName,
                    taskSort: parseInt(taskSort),
                    syncDt: syncDt
                } as ITask);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                console.table(e.currentTarget)
                router.push('/todo/tasks');
            }
        } catch (error: any) {
            console.error(error);

        }
    };

    return (
        <div>
            <h1>Edit Task</h1>
            {task ? (
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label className="control-label" htmlFor="taskName">TaskName</label>
                                    <input className="form-control" type="text" id="taskName" name="taskName" defaultValue={task.taskName} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="taskSort">TaskSort</label>
                                    <input className="form-control" type="number" id="taskSort" name="taskSort" defaultValue={task.taskSort} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="syncDt">SyncDt</label>
                                    <input className="form-control" type="datetime-local" id="syncDt" name="syncDt" defaultValue={FormatDateToCalendarForm(task.syncDt)} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>

                                <div className="form-group">
                                    <input type="hidden" name="id" defaultValue={task.id} />
                                    <input type="submit" value="Save" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Link href="/todo/tasks">Back to List</Link>
                    </div>
                </>

            ) : (
                <p>Loading...</p> // Render loading message while data is being fetched
            )}
        </div>
    );
};



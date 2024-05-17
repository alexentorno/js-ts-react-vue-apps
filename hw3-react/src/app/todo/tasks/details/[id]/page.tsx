"use client"
import { useParams } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { ITask } from '@/domain/ITask';
import { AppContext } from '@/state/AppContext';
import { useRouter } from "next/navigation";
import FormatDate from '@/todo/FormatDate';
import Link from 'next/link';
import DeleteService from '@/services/CRUD/DeleteService';
import GetService from '@/services/CRUD/GetService';
import formatDate from '@/todo/FormatDate';
import useCategoriesAndPriorities from '@/todo/useCategAndPrior';


export default function TaskDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { userInfo } = useContext(AppContext)!;
    const [task, setTask] = useState<ITask | null>(null);
    const [taskCategories, taskPriorities] = useCategoriesAndPriorities();


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

        e.preventDefault();


        try {
            const response = await DeleteService.deleteTask(userInfo!.token, id.toString());

            if (response.errors) {
                console.error(response.errors);

            } else {

                router.push('/todo/tasks');
            }
        } catch (error: any) {
            console.error(error);

        }
    };

    return (
        <div>
            <h1>Task details</h1>
            {task ? (
                <>

                    <div>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                TaskName
                            </dt>
                            <dd className="col-sm-10" >
                                {task.taskName}
                            </dd>
                            <dt className="col-sm-2">
                                TaskSort
                            </dt>
                            <dd className="col-sm-10">
                                {task.taskSort}
                            </dd>
                            <dt className="col-sm-2">
                                CreatedDt
                            </dt>
                            <dd className="col-sm-10" >
                                {formatDate(task.createdDt)}
                            </dd>
                            <dt className="col-sm-2">
                                DueDt
                            </dt>
                            <dd className="col-sm-10" >
                                {formatDate(task.dueDt)}
                            </dd>
                            <dt className="col-sm-2">
                                IsCompleted
                            </dt>
                            <dd className="col-sm-10" >
                                <input className="check-box" type="checkbox" checked={task.isCompleted} disabled />
                            </dd>
                            <dt className="col-sm-2">
                                IsArchived
                            </dt>
                            <dd className="col-sm-10" >
                                <input className="check-box" type="checkbox" checked={task.isArchived} disabled />
                            </dd>
                            <dt className="col-sm-2">
                                TodoCategory
                            </dt>
                            <dd className="col-sm-10" >
                                {Object.entries(taskCategories).map(([id, name]) => (
                                    id === task.todoCategoryId.toString() ? name : null
                                ))}
                            </dd>
                            <dt className="col-sm-2">
                                TodoPriority
                            </dt>
                            <dd className="col-sm-10" >
                                {Object.entries(taskPriorities).map(([id, name]) => (
                                    id === task.todoPriorityId.toString() ? name : null
                                ))}
                            </dd>
                            <dt className="col-sm-2">
                                SyncDt
                            </dt>
                            <dd className="col-sm-10" >
                                {FormatDate(task.syncDt)}
                            </dd>
                        </dl>

                        <form onSubmit={handleSubmit}>
                            <Link href={`/todo/tasks/edit/${task.id}`}>Go to Edit</Link> |
                            <Link href="/todo/tasks">Back to List</Link>
                        </form>
                    </div>
                </>

                /* TODO https://react-bootstrap.netlify.app/docs/components/modal/ */

            ) : (
                <p>Loading...</p> // Render loading message while data is being fetched
            )}
        </div>
    );
};



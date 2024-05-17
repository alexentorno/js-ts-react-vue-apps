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
import useCategoriesAndPriorities from '@/todo/useCategAndPrior';



export default function EditTaskPage() {
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
        console.table(userInfo)

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const taskName = formData.get('taskName')?.toString() ?? "";
        const taskSort = formData.get('taskSort')?.toString() ?? "";
        const createdDt = formData.get('createdDt')?.toString() ?? "";
        const dueDt = formData.get('dueDt')?.toString() ?? "";
        const syncDt = formData.get('syncDt')?.toString() ?? "";
        const isCompleted = formData.get('isCompleted') === "true";
        const isArchived = formData.get('isArchived') === "true";
        const todoPriorityId = formData.get('todoPriorityId')?.toString() ?? "";
        const todoCategoryId = formData.get('todoCategoryId')?.toString() ?? "";


        try {
            const response = await PutService.putTask(userInfo!.token, id.toString(),
                {
                    id: id,
                    taskName: taskName,
                    taskSort: parseInt(taskSort),
                    createdDt: createdDt,
                    dueDt: dueDt,
                    syncDt: syncDt,
                    isCompleted: isCompleted,
                    isArchived: isArchived,
                    todoPriorityId: todoPriorityId,
                    todoCategoryId: todoCategoryId
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
                                    <label className="control-label" htmlFor="createdDt">CreatedDt</label>
                                    <input className="form-control" type="datetime-local" id="createdDt" name="createdDt" defaultValue={FormatDateToCalendarForm(task.createdDt)} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" id="isCompleted" name="isCompleted" defaultChecked={task.isCompleted} /> IsCompleted
                                    </label>
                                </div>
                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" id="isArchived" name="isArchived" defaultChecked={task.isArchived} /> IsArchived
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="dueDt">DueDt</label>
                                    <input className="form-control" type="datetime-local" id="dueDt" name="dueDt" defaultValue={FormatDateToCalendarForm(task.dueDt)} />
                                    <span className="text-danger field-validation-valid"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="todoCategoryId">TodoCategoryId</label>
                                    <select className="form-control" id="todoCategoryId" name="todoCategoryId" defaultValue={Object.entries(taskPriorities).map(([id, name]) => (
                                        id === task.todoCategoryId.toString() ? name : ""
                                    ))}>
                                        {Object.entries(taskCategories).map(([id, name]) =>
                                            <option key={id} value={id}>{name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="todoPriorityId">TodoPriorityId</label>
                                    <select className="form-control" id="todoPriorityId" name="todoPriorityId" defaultValue={Object.entries(taskPriorities).map(([id, name]) => (
                                        id === task.todoPriorityId.toString() ? name : ""
                                    ))}>
                                        {Object.entries(taskPriorities).map(([id, name]) =>
                                            <option key={id} value={id}>{name}</option>
                                        )}
                                    </select>
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



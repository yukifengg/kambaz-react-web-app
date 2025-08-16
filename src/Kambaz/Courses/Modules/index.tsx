import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const fetchModules = async () => {
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModules();
    }, []);
    const createModuleForCourse = async () => {
        if (!cid) return;
        const newModule = { name: moduleName, course: cid };
        const module = await coursesClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
    };
    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    const saveModule = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };





    return (
        <div>
            <ul id="wd-modules" className="list-group rounded-0">

                    <ModulesControls
                        moduleName={moduleName}
                        setModuleName={setModuleName}
                        addModule= {createModuleForCourse} />
                {modules
                    .map((module: any) => (
                        <li key={module._id} className="wd-module list-group-item p-0 m-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input
                                        className="form-control w-50 d-inline-block"
                                        onChange={(e) =>
                                            dispatch(
                                                updateModule({ ...module, name: e.target.value })
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                saveModule({ ...module, editing: false });
                                            }
                                        }}
                                        defaultValue={module.name}
                                    />
                                )}
                                        <ModuleControlButtons
                                            moduleId={module._id}
                                            deleteModule={(moduleId) => removeModule(moduleId)}
                                            editModule={(moduleId) => dispatch(editModule(moduleId))}
                                        />

                                        {/* Course Management Buttons */}
                                        <button
                                            className="btn btn-success m-2"
                                            onClick={() => {/* Publish Module Action */}}
                                        >
                                            Publish
                                        </button>
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={() => {/* Unpublish Module Action */}}
                                        >
                                            Unpublish
                                        </button>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => {/* Mark as Important Action */}}
                                        >
                                            Important
                                        </button>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => {/* Disable Module Action */}}
                                        >
                                            Disable
                                        </button>
                            </div>

                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3" /> {lesson.name}

                                             <LessonControlButtons id={""} type={"assignment"} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
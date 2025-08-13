import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchModulesForCourse = async () => {
   const modules = await coursesClient.findModulesForCourse(cid!);
   dispatch(setModules(modules));
 };
 useEffect(() => {
   fetchModulesForCourse();
 }, [cid]);

 const addModuleHandler = async () => {
   const newModule = await coursesClient.createModuleForCourse(cid!, {
     name: moduleName,
     course: cid,
   });
   dispatch(addModule(newModule));
   setModuleName("");
 };

 const deleteModuleHandler = async (moduleId: string) => {
   await modulesClient.deleteModule(moduleId);
   dispatch(deleteModule(moduleId));
 };

 const updateModuleHandler = async (module: any) => {
   await modulesClient.updateModule(module);
   dispatch(updateModule(module));
 };


  const isFaculty = currentUser?.role === "FACULTY";

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // const saveModule = async (module: any) => {
  //   await modulesClient.updateModule(module);
  //   dispatch(updateModule(module));
  // }

  return (
    <div className="wd-modules-container">

      {isFaculty && (
        <ModulesControls
        addModule={addModuleHandler}
        setModuleName={setModuleName} 
        moduleName={moduleName}
        />
      )}
      
      <br /><br /><br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          // .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module Title */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                    {module.editing && (
                      <input onChange={(e) =>
                                updateModuleHandler({ ...module, name: e.target.value }) }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateModuleHandler({ ...module, editing: false });
                                }
                              }}
                              value={module.name}/>
                      )}

                </div>
                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
              </div>

              {/* Lessons */}
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                      </div>
                      {isFaculty && <LessonControlButtons moduleId = {module._id} id={lesson._id} type={"lesson"} />}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

import pythonExecutor from "../containes/pythonExecutor";
import javaExecutor from "../containes/javaExecutor";
import cppExecutor from "../containes/cppExecutor";
import CodeExecutorStrategy from "../types/codeExecutor";
// import CodeExecutorStrategy from "../types/codeExecutor";

export default  function createExecutor(codeLanguage:string) :CodeExecutorStrategy  | null{
   if(codeLanguage.toLocaleLowerCase() === "python") {
        return new pythonExecutor();
    } else if (codeLanguage.toLocaleLowerCase() === "java"){
        return new javaExecutor();
    } 
    else if(codeLanguage.toLocaleLowerCase()==="cpp"){
        return new cppExecutor();
    }
    else {
        return null;
    }
}
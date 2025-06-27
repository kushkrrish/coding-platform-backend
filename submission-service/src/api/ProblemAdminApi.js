const axiosInstance=require('../config/axiosConfig');
const {PROBLEM_ADMIN_SERVICE_URL}=require('../config/serverCOnfig');

const problemUrl=`${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

async function fetchProblem(problemId){
    try {
        const uri= problemUrl+`/problems/${problemId}`;
        const response=await axiosInstance.get(uri);
         console.log("Api response: ", response.data);
         return response.data;
    } catch (error) {
         console.log("Something went wrong while fetching problem details");
        console.log(error);
    }
}

module.exports=fetchProblem;
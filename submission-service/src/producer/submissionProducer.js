const submissionQueue=require("../queue/submissionQueue");
module.exports= async function (payload) {
   await submissionQueue.add('submissionJob',payload);
   console.log("successfully added job");
}

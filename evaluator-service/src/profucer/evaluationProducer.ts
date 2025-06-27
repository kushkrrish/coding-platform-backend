
import evaluationQueue from "../queue/evaluationQueue";

export default async function(payload: Record<string, unknown>) {
    await evaluationQueue.add("evaluationJob", payload);
    console.log("Successfully added a new job");
}
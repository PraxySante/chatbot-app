import axiosDirectus from "./axiosDirectus.service";

type CreateDirectusAttributes = {
	name: string;
	Date: Date;
	Asked_question: string;
	Model_answer: string;
	Source_nodes: string;
	Satisfaction: number;
	Comments: string;
	Historic: string;
};
export async function createDirectus({
	name,
	Date,
	Asked_question,
	Model_answer,
	Source_nodes,
	Satisfaction,
	Comments,
	Historic,
}: CreateDirectusAttributes) {
	try {
		await axiosDirectus.post("/", {
			name,
			Date,
			Asked_question,
			Model_answer,
			Source_nodes,
			Satisfaction,
			Comments,
			Historic,
		});
	} catch (error) {
		console.error(error);
	}
}

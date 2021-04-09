import { IBase } from "../shared/IBase";

export interface IFeeDetail extends IBase {
	Amount: number;
	DueDate: Date;
	Status: string;
	StudentCode: string;
	SchoolCode: string;
	Description: string;
	ReferenceNo: string;
	StudentId: number;


}
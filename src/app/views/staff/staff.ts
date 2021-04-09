import { IBase } from "../shared/IBase";

 


export interface IStaff  extends IBase  {
	Id: number;
	Name: string;
	Code: string;
	Gender: string;
	EmailID: string;
	Mobile: string;
	IsTeacher: boolean;
	Salutation: string;
	DateOfBirth: Date;
	SchoolCode: string;
	IsDeleted: boolean;
	IsAdmin: boolean;
}
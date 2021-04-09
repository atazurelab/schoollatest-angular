import { IBase } from "../shared/IBase";

export interface IStudent extends IBase
{
	Id:number;
	Name :string;
Code :string;
EmailId :string;
Mobile :string;
Gender :string;
ClassCode :string;
SchoolCode :string;
Address :string;
Description :string;
DateOfBirth :Date;
IsDeleted :false;
	 
}
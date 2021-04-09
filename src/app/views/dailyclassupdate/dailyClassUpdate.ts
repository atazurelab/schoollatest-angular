import { IBase } from "../shared/IBase";


export interface IDailyClassUpdate extends IBase{
	ClassCode :string;
SchoolCode :string;
ClassWork :string;
HomeWork :string;
UpdateForDate :Date;
Period :string;
Subject :string;
Teacher :string;
SchoolId :number;
ClassId :number;

	 
}
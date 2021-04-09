import { IBase } from "../shared/IBase";

export interface IHoliday extends IBase {
	Name :string;
StartDate :Date;
EndDate :Date;
Description :string;
SchoolCode :string;

	 
}
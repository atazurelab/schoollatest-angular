import { IBase } from "../shared/IBase";


export interface ITimetable extends IBase {
  

	ClassCode: string;
	ClassId: number;
	Period: string;
	Day: string;
	SchoolCode: string;
	SchoolId: number;
	TeacherCode: string;
	TeacherId: number;
	Subject: string; 

}

export interface ISchedule extends IBase {
  
		Period  : string;
		Monday  : string;
		Tuesday  : string;
		Wednesday : string;
		Thursday : string;
		Friday  : string;
		Saturday  : string;
		Sunday  : string; 

		ObjMonday  : ITimetable;
		ObjTuesday  : ITimetable;
		ObjWednesday : ITimetable;
		ObjThursday : ITimetable;
		ObjFriday  : ITimetable;
		ObjSaturday  : ITimetable;
		ObjSunday  : ITimetable; 

}
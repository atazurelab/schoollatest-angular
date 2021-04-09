import { IBase } from "../shared/IBase";

export interface INoticeBoard extends IBase {
	Subject :string;
Notice :string;
SchoolCode :string;
PublishedByUserID :number;
PublishedDateTime :Date;

	 
}
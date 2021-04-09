  


export interface IStudentData     { 
	Name: string;
	Code: string;
	Gender: string;
	EmailId: string;
	Mobile: string; 
	DateOfBirth: Date;
	ClassCode: string;
	Address: string;  
	 
}


export interface IStaffData     { 
	Name: string;
	Code: string;
	Gender: string;
	EmailId: string;
	Mobile: string; 
	DateOfBirth: Date;
	ClassCode: string;
	Address: string;  
	IsTeacher : boolean;
	 
}

export interface IPeriodData      { 
  
	Name: string; 
	ClassCode: string;
	Description: string;  
	 
}

export interface IClassData      { 
  
	Name: string; 
	ClassCode: string;
	Description: string;  	 
	 
}

export interface IHolidayData      { 
  
	Name: string; 
	StartDate: Date;
	EndDate: Date;
	Description: string;   
}

export interface INoticeBoardData      { 
  
	Subject: string; 
	NoticeDateTime: Date;
	EndDate: Date;
	Notice: string;   
 
}

export interface IFeesData      {         
	Amount: number; 
	DueDate: Date;
	Status: string;
	StudentCode: string;   
	Description: string;  
	ReferenceNo: string;   
}
 
 
export interface ITimetableData    {         
 
	ClassCode: string;
	Period: string;   
	Monday: string;  
	Tuesday: string;   
	Wednesday: string;   
	Thursday: string;   
	Friday: string;   
	Saturday: string;   
	Sunday: string;   

}


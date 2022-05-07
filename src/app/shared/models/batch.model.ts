
export class Session {
    _id: string;
    id: string;
    sessionName: string;
    sessionAddress: string;
    sessionStartDate: any;
    sessionEndDate: any;
    sessionStartTime: any;
    sessionEndTime: any;
    noOfSeats: string;
    instructor: string;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }
        this._id = obj._id;
        this.id = obj.id;
        this.sessionName= obj.sessionName;
        this.sessionAddress=obj.sessionAddress;
        this.sessionStartDate=obj.sessionEndDate;
        this.sessionEndDate=obj.sessionEndDate;
        this.sessionStartTime=obj.sessionStartTime;
        this.sessionEndTime=obj.sessionEndTime;
        this.noOfSeats=obj.noOfSeats;
        this.instructor=obj.instructor;
}
}
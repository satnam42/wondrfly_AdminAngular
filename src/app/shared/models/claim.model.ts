
export class Claim {

    requestOn: string;
    requestBy: string;
    status: string;

    _id: string;
    providerId: string;
    userId: string;
    programId: string;
    createdOn: string;
    updatedOn: string;
    __v: number;

    id: string;
    avatarImages: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    profilePic: string;
    anniversary: string;
    dob: string;
    role: string;
    country: string;
    deviceToken: string;
    password: string;
    isSuccess: boolean;
    sex: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    lat: string;
    long: string;
    stripeToken: string;
    stripeKey: string;
    lastLoggedIn: null;
    loginLimit: number;
    ssn: string;
    isDeleted: string;
    lastModified: string;
    createdBy: string;



    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.requestOn = obj.requestOn;
        this.requestBy = obj.requestBy;
        this.status = obj.status;
        this._id = obj._id;
        this.providerId = obj.providerId;
        this.userId = obj.userId;
        this.programId = obj.programId;
        this.createdOn = obj.createdOn;
        this.updatedOn = obj.updatedOn;
        this.__v = obj.__v;

        this.id = obj.id;
        this.avatarImages = obj.avatarImages;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.phoneNumber = obj.phoneNumber;
        this.email = obj.email;
        this.address = obj.address;
        this.profilePic = obj.profilePic;
        this.anniversary = obj.anniversary;
        this.dob = obj.dob;
        this.role = obj.role;
        this.country = obj.country;
        this.deviceToken = obj.deviceToken;
        this.password = obj.password;
        this.isSuccess = obj.isSuccess;
        this.sex = obj.sex;
        this.addressLine1 = obj.addressLine1;
        this.addressLine2 = obj.addressLine2;
        this.city = obj.city;
        this.zipCode = obj.zipCode;
        this.lat = obj.lat;
        this.long = obj.long;
        this.stripeToken = obj.stripeToken;
        this.stripeKey = obj.stripeKey;
        this.lastLoggedIn = obj.lastLoggedIn;
        this.loginLimit = obj.loginLimit;
        this.ssn = obj.ssn;
        this.isDeleted = obj.isDeleted;
        this.lastModified = obj.lastModified;
        this.createdBy = obj.createdBy;



    }
}
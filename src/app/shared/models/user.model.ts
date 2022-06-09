
export class Userr {
    expiredIn:any={}
    time:any;
    acceptance:boolean;
    date:string;
    approvalDate:string;
    name:string;
    id: string;
    _id: string;
    banners:any= [];
    isActivated: boolean;
    isSuccess: boolean;
    userId: string;
    age: string;
    firstName: string;
    userName:string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    emailId: string;
    about: string;
    fullName: string;
    email: string;
    type: string;
    mobile: number;
    phoneNumber: string;
    role: string;
    city: string;
    confirmPassword: string;
    password: string;
    newPassword: string;
    token: string;
    createdAt: string;
    otp: string;
    otpToken: string;
    avatarImages: string;
    category: string;
    description: string;
    facebook: string;
    website: string;
    twitter: string;
    instagram: string;
    youtube: string;
    country: string;
    zipCode: string;
    lat: string;
    lng: string;
    answer: string;
    securityQuestion: string;
    providerId: string;
    programId: string;
    status: any;
    taxNumber: string;
    sex: string;
    stripeToken: string;
    stripeKey: string;
    ssn: string;
    deviceToken: string;
    location: string;
    source:any = [];
    sourceUrl:any = [];
    state: string;
    note: string;
    tier: string;
    fullAddress: string;
    isAmbassador: boolean;
    isPublished: boolean;
    alias : string;
    categoryIds = [];
    cycle:string;
    subCategoryIds:any =[];
    activeStatus: string;
    rating: any ={};
    linkedin:string
    bio:string
    links:any=[]
    tagsId:any=[]
    interests:any=[]
    healthAndSafety:any = []
    logo:string
    street:string
    secondaryPhonenumber:string
    categories:any=[]
    isInvited:any
    inviter:string;
    ipAddress:string;
    bookedActivityFor:string;
    occupation:string;
    lookingkidsActivityIn:string;
    willActive:string;
    wantWondrflyBetaUserBecause:string;
    bookedActivityInLastMonths:string;
    approvedBy:any={}

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.id = obj.id;
        this._id = obj._id;
        this.banners = obj.banners;
        this.isActivated = obj.isActivated;
        this.isSuccess = obj.isSuccess;
        this.fullName = obj.fullName;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.about = obj.about;
        this.emailId = obj.emailId;
        this.email = obj.email;
        this.addressLine1 = obj.addressLine1;
        this.addressLine2 = obj.addressLine2;
        this.type = obj.type;
        this.mobile = obj.mobile;
        this.phoneNumber = obj.phoneNumber;
        this.password = obj.password;
        this.newPassword = obj.newPassword;
        this.confirmPassword = obj.confirmPassword;
        this.city = obj.city;
        this.token = obj.token;
        this.createdAt = obj.createdAt;
        this.otp = obj.otp;
        this.otpToken = obj.otpToken;
        this.avatarImages = obj.avatarImages;
        this.category = obj.category;
        this.description = obj.description;
        this.facebook = obj.facebook;
        this.youtube = obj.youtube;
        this.website = obj.website;
        this.twitter = obj.twitter;
        this.instagram = obj.instagram;
        this.country = obj.country;
        this.zipCode = obj.zipCode;
        this.lat = obj.lat;
        this.lng = obj.lng;
        this.securityQuestion = obj.securityQuestion;
        this.answer = obj.answer;
        this.providerId = obj.providerId;
        this.programId = obj.programId;
        this.status = obj.status;
        this.taxNumber = obj.taxNumber;
        this.sex = obj.sex;
        this.stripeToken = obj.stripeToken;
        this.stripeKey = obj.stripeKey;
        this.ssn = obj.ssn;
        this.deviceToken = obj.deviceToken;
        this.location = obj.location;
        this.source = obj.source;
        this.sourceUrl = obj.sourceUrl;
        this.state = obj.state;
        this.note = obj.note;
        this.tier = obj.tier;
        this.fullAddress = obj.fullAddress;
        this.isAmbassador = obj.isAmbassador;
        this.isPublished = obj.isPublished;
        this.alias = obj.alias
        this.categoryIds = obj.categoryIds
        this.cycle = obj.cycle
        this.subCategoryIds= obj.subCategoryIds
        this.activeStatus = obj.activeStatus
        this.age = obj.age
        this.rating = obj.rating
        this.linkedin = obj.linkedin
        this.bio =obj.bio
        this.links = obj.links
        this.tagsId = obj.tagsId
        this.interests = obj.interests
        this.healthAndSafety = obj.healthAndSafety
        this.street = obj.street
        this.logo = obj.logo
        this.secondaryPhonenumber = obj.secondaryPhonenumber
    }
}
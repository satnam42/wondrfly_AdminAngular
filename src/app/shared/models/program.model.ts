import { Time } from '@angular/common';

export class Program {
    id: string;
    _id: string;
    isFav: boolean;
    name: string;
    description: string;
    type: string;
    email: string;
    price: string;
    location: string;
    code: string;
    programId: string;
    time: any = {};
    date: any = {}
    addedBy: {};
    ageGroup: any = {};
    bookingCancelledIn: any = {};
    duration: any = {};
    isFree: boolean = false;
    isproRated: boolean = false;
    isPublished: boolean;
    isDateNotMention: boolean = false;
    isTimeNotMention: boolean = false;
    pricePerParticipant: string;
    priceForSiblings: string;
    specialInstructions: string;
    adultAssistanceIsRequried: boolean = false;
    capacity: any = {};
    emails = [];
    sessions: any[];
    status: string;
    programCoverPic: string;
    userId: string;
    addresses: [];
    categoryId: any = [];
    tags: any = [];
    days: any = [];
    timelinePics: any[];
    user: string;
    joiningLink: string;
    presenter: string;
    lat: string;
    lng: string;
    categoryIds: [];
    programImage: any;
    indoorOroutdoor: string;
    subCategoryIds: [];
    source: [];
    sourceUrl: [];
    cycle: string
    activeStatus: string;
    city: string;
    category: any = [];
    alias: string;
    perTimePeriod: string
    pricePeriod: any = {}
    inpersonOrVirtual: string;
    extractionDate: Date;
    proofreaderRating: string;
    realTime: any = {
        from: 0,
        to: 0
    }
    isExpired: boolean = false;
    per_hour_rate: any;
    last_reviewed = new Date();
    cycle_time: number;
    proof_reader_notes: string;
    isPrivateLession: boolean = false;
    daysLeft: string;
    instructor: string;
    isParentJoin: boolean = false;
    offerDiscount: string;
    maxTravelDistance: number;
    totalSessionClasses: number;
    isParentGuardianRequire: boolean = false;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.categoryIds = obj.categoryIds
        this.id = obj.id;
        this._id = obj._id
        this.userId = obj.userId;
        this.programId = obj.programId;
        this.name = obj.name;
        this.programCoverPic = obj.programCoverPic;
        this.email = obj.email;
        this.description = obj.description;
        this.type = obj.type;
        this.price = obj.price;
        this.location = obj.location;
        this.code = obj.code;
        this.status = obj.status;
        this.time = obj.time;
        this.date = obj.date;
        this.ageGroup = obj.ageGroup;
        this.bookingCancelledIn = obj.bookingCancelledIn;
        this.duration = obj.duration;
        this.isFree = obj.isFree;
        this.isDateNotMention = obj.isDateNotMention;
        this.isTimeNotMention = obj.isTimeNotMention;
        this.pricePerParticipant = obj.pricePerParticipant;
        this.priceForSiblings = obj.priceForSiblings;
        this.specialInstructions = obj.specialInstructions;
        this.adultAssistanceIsRequried = obj.adultAssistanceIsRequried;
        this.capacity = obj.capacity;
        this.emails = obj.emails;
        this.userId = obj.userId;
        this.addresses = obj.addresses;
        this.tags = obj.tags;
        this.categoryId = obj.categoryId;
        this.timelinePics = obj.timelinePics;
        this.user = obj.user;
        this.joiningLink = obj.joiningLink;
        this.presenter = obj.presenter;
        this.lat = obj.lat;
        this.lng = obj.lng;
        this.indoorOroutdoor = obj.indoorOroutdoor
        this.subCategoryIds = obj.subCategoryIds
        this.source = obj.source
        this.sourceUrl = obj.sourceUrl
        this.cycle = obj.cycle;
        this.activeStatus = obj.activeStatus
        this.city = obj.city
        this.alias = obj.alias
        this.perTimePeriod = obj.perTimePeriod
        this.pricePeriod = obj.pricePeriod
        this.inpersonOrVirtual = obj.inpersonOrVirtual
        this.extractionDate = obj.extractionDate
        this.proofreaderRating = obj.proofreaderRating
        this.days = obj.days
    }
}

export class Category {
id: string;
    _id: string;
    token: string;
    name: string;
    description: String;
    imageUrl : string;
    iconUrl: string;
    
    constructor(obj?: any) {

        if (!obj) {
            return;
        }
        this.id = obj.id;
        this._id = obj._id;
        this.token = obj.token;
        this.name = obj.name;
        this.description = obj.description
        this.imageUrl = obj.imageUrl
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Userr } from '../models/user.model';
import { Forum } from '../models/forum.model';
import { Category } from '../models/category.model';
import { Tag } from '../models/tag.model';
import { Child } from '../models/child.model';
import { Program } from '../models/program.model';
import { Claim } from '../models/claim.model';
import { environment } from 'environments/environment.prod';
import { User } from 'app/views/app-chats/chat.service';
import { AppLoaderService } from './app-loader/app-loader.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    root = environment.apiURL;
    userResponse: any;
    usersData: any;
    categoryResponse: any;
    tagResponse: any;
    ForumResponse: any;
    token: string = ''



    constructor(private http: HttpClient, private loader: AppLoaderService) {

    }
    // --------------------access token------------------------
    getHeaders() {
        this.token = localStorage.getItem('token');
        let header
        if (this.token != '') {
            header = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': this.token
                })
            }
        } else {
            console.log('token not found')
        }
        return header;

    }
    getImageHeader() {
        this.token = localStorage.getItem('token');
        let header
        if (this.token != '') {
            header = {
                headers: new HttpHeaders({
                    'enctype': 'multipart/form-data',
                    'Accept': 'application/json',
                    'x-access-token': this.token
                })
            }
        } else {
            console.log('token not found')
        }
        return header;

    }

    login(model): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.post(`${this.root}/users/login`, model, { headers: null }).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);

        });

        return subject.asObservable();
    }



    parentLoginById(id): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.post(`${this.root}/users/parentLoginFromAdmin/${id}`, { headers: null }).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);

        });
        return subject.asObservable();
    }


    getPicUrl(pic) {
        const subject = new Subject<any>();
        this.http.post(`${this.root}/uploads/getPicUrl`, pic, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    categoryImageUpload(formdata, id) {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/categories/uploadPic/${id}`, formdata, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    subCategoryImageUpload(apiType, formdata, id) {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/${apiType}/uploadImage/${id}`, formdata, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    subCategoryIconUpload(apiType, formdata, id) {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/${apiType}/uploadIcon/${id}`, formdata, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    subCategoryLogoUpload(apiType, formdata, id) {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/${apiType}/uploadLogo/${id}`, formdata, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    subCategoryPatternUpload(apiType, formdata, id) {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/${apiType}/uploadPattern/${id}`, formdata, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    addCategory(model): Observable<Category[]> {
        const subject = new Subject<Category[]>();
        this.http.post(`${this.root}/categories/add`, model, this.getHeaders()).subscribe((responseData) => {
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();

    }


    addTag(model): Observable<Tag[]> {
        const subject = new Subject<Tag[]>();
        this.http.post(`${this.root}/tags/add`, model, this.getHeaders()).subscribe((responseData) => {
            this.tagResponse = responseData;
            subject.next(this.tagResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();

    }
    // -------------------------- get Tag By Category Id ------------------------->

    getTagByCategoryId(id): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/tags/byCategoryId?catrgoryIds=${id}`, this.getHeaders()).subscribe((responseData: any) => {
            const dataModel = responseData;
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    getCategory(): Observable<Category[]> {
        const subject = new Subject<Category[]>();
        this.http.get(`${this.root}/categories/list`,).subscribe((responseData) => {
            // this.getHeaders() 
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    activateDeactivateCategory(isActivated, id): Observable<Category[]> {
        const subject = new Subject<Category[]>();
        this.http.put(`${this.root}/categories/activeOrDeactive?id=${id}&isActivated=${isActivated}`, '', this.getHeaders()).subscribe((responseData) => {
            // this.getHeaders() 
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    getTag(): Observable<Tag[]> {
        const subject = new Subject<Tag[]>();
        this.http.get(`${this.root}/tags/list`, this.getHeaders()).subscribe((responseData) => {
            this.tagResponse = responseData;
            subject.next(this.tagResponse.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getUsers(role, no, size): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/users/list?pageNo=${no}&pageSize=${size}&role=${role}`, { headers: null }).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // -------------------getMontclairProvider users-------------------
    getMontclairProvider(no, size): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/providers/montclairProviders?pageNo=${no}&pageSize=${size}`, { headers: null }).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // -------------------get Provider users by Date-------------------
    providerByDate(date): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/providers/searchCreateModifiedDate?date=${date}`, { headers: null }).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // -------------------beta users-------------------

    betaProgramUsers(): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/invitation/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    // -------------------approve all beta users -------------------

    approveAllBetaUsers(): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.post(`${this.root}/invitation/approveAll`, '', this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    // -------------------approve or decline beta user -------------------

    approveOrDeclineById(type, id): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.put(`${this.root}/invitation/approveOrDecline?type=${type}&id=${id}`, '', this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    // -------------------get all children-------------------
    getChildren(number, size): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.get(`${this.root}/child/list?pageNo=${number}&pageSize=${size}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    userActiveInActive(id, isActivated) {
        const subject = new Subject<Userr[]>();
        let m;
        this.http.put(`${this.root}/users/activeOrDeactive?id=${id}&isActivated=${isActivated}`, m, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getUserById(id): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/users/getById/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    uploadUserImage(id, model): Observable<any> {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/users/uploadProfilePic/${id}`, model, this.getImageHeader()).subscribe((response) => {
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        }
        );
        return subject.asObservable();
    }

    addUser(data): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.post(`${this.root}/users/register`, data, { headers: null }).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getParents(pageNo, pageSize): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/parents/list?pageNo=${pageNo}&pageSize=${pageSize}`, { headers: null }).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // ----------------------------------------Program filtesrs---------------------------------------------
    searchParentFilter(filter): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/parents/searchByNameEmailStatus?${filter}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteUser(id): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.put(`${this.root}/users/delete?id=${id}`, '', this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getChild(): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.get(`${this.root}/child/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse.items);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteChild(id): Observable<Child[]> {
        var response: any;
        let a;
        const subject = new Subject<Child[]>();
        this.http.put(`${this.root}/child/delete/${id}`, a, this.getHeaders()).subscribe((responseData) => {
            response = responseData;
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    getChildByParentId(id): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.get(`${this.root}/child/byParentId/${id}`, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse.data);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    addChild(model): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.post(`${this.root}/child/add`, model, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    updateChild(id, model): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.put(`${this.root}/child/update/${id}`, model, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    updateParent(_id, model): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.put(`${this.root}/parents/update/${_id}`, model, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();

    }

    updateCategory(_id, model): Observable<Category[]> {
        const subject = new Subject<Category[]>();
        this.http.put(`${this.root}/categories/update/${_id}`, model, this.getHeaders()).subscribe((responseData) => {
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();

    }

    deleteCategory(id): Observable<Child[]> {
        var response: any;
        let a;
        const subject = new Subject<Child[]>();
        this.http.delete(`${this.root}/categories/delete/${id}`, this.getHeaders()).subscribe((responseData) => {
            response = responseData;
            subject.next(response);

        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    updateTag(_id, model): Observable<Tag[]> {
        const subject = new Subject<Tag[]>();
        this.http.put(`${this.root}/tags/update/${_id}`, model, this.getHeaders()).subscribe((responseData) => {
            this.tagResponse = responseData;
            subject.next(this.tagResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();

    }

    searchTag(key): Observable<Tag> {
        const subject = new Subject<Tag>();
        this.http.get(`${this.root}/tags/search?name=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    activateDeactivateTag(id, isActivated): Observable<Tag> {
        const subject = new Subject<Tag>();
        this.http.put(`${this.root}/tags/activeOrDeactive?id=${id}&isActivated=${isActivated}`, '', this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    addProgram(model): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.post(`${this.root}/programs/add`, model, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    searchProgram(key): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/searchByNameAndDate?programName=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    // ----------------------------------------Program filtesrs---------------------------------------------
    searchProgramFilter(keyType, keyValue): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/searchByKeyValue?keyType=${keyType}&keyValue=${keyValue}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // ----------------------------------------Program filtesrs by Date---------------------------------------------
    programFilterByDate(value, from, to): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/histogram?period=${value}&fromDate=${from}&toDate=${to}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    programMultiFilter(filter): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/multiFilter?${filter}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.items);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    updateProgram(id, model): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.put(`${this.root}/programs/update/${id}`, model, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    trueFalseFreeTrialProgram(programId, isFreeTrial): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.put(`${this.root}/programs/freeTrail?programId=${programId}&isFreeTrial=${isFreeTrial}`, '', this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    trueFalseFreeTrialProvider(providerId, isFreeTrial): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.put(`${this.root}/providers/freeTrail?userId=${providerId}&isFreeTrial=${isFreeTrial}`, '', this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    getProgram(pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/list?pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // =============================================Montclair Programs ====================================================
    getMontclairProgram(pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/montclairPrograms?pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    createDuplicateProgram(programId): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.put(`${this.root}/programs/duplicateCreate/${programId}`, '', this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteProgram(id): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        let a;
        this.http.delete(`${this.root}/programs/delete/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    getProgramByProvider(userId, pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/byProvider?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error);
        });
        return subject.asObservable();
    }
    getAllProgramByUser(userId, pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/byUser?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error);
        });
        return subject.asObservable();
    }
    getExpiredProgramByUser(userId, pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/expiredByProvider?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error);
        });
        return subject.asObservable();
    }
    // -------------------------- get Program by id  start------------------------->

    getProgramById(id): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/getById/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    // -------------------------- get Program by id  end------------------------->

    programActiveInActive(id, status) {
        const subject = new Subject<Program[]>();
        let m;
        this.http.put(`${this.root}/programs/activeOrDecactive?id=${id}&status=${status}`, m, this.getHeaders()).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    addProvider(model): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.post(`${this.root}/providers/add`, model, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getProviderReport(from, to): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/report?fromDate=${from}&toDate=${to}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    getAllReport(from, to): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/reports/search?fromDate=${from}&toDate=${to}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getProvider(): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/users/providers`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getProviderById(id): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/getById/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }



    getProviderVerifiedOrNot(pageNo, pageSize, type): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/isVerifiedOrNot?pageNo=${pageNo}&pageSize=${pageSize}&type=${type}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    searchProviderByName(key): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/search?name=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    searchProviderByEmail(key): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/byEmialId?email=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    searchProviderById(id): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/getById/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    searchVerifiedUnverfiedProviders(name, type): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/searchVerifiedOrUnverified?name=${name}&type=${type}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }





    providerListByFilter(city, state, country, source, type, sex, pageSize, pageNo): Observable<Userr> {
        let querry: any;
        let value: any;
        if (city) {
            querry = 'city';
            value = city;
        }
        if (state) {
            querry = 'state';
            value = state;
        }
        if (country) {
            querry = 'country';
            value = country;
        }
        if (type) {
            querry = 'type';
            value = type;
        }
        if (sex) {
            querry = 'sex';
            value = sex;
        }
        if (source) {
            querry = 'source';
            value = source;
        }
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/listByFilter?${querry}=${value}&pageSize=${pageSize}&pageNo=${pageNo}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });

        return subject.asObservable();
    }


    updateProvider(model): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.put(`${this.root}/providers/update/${model.id}`, model, this.getHeaders()).subscribe(res => {
            let response: any = res;
            subject.next(response);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();

    }
    getClaimsList(): Observable<Claim[]> {
        const subject = new Subject<Claim[]>();
        this.http.get(`${this.root}/claims/requestList`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    claimAction(data): Observable<Claim[]> {
        const subject = new Subject<Claim[]>();
        this.http.put(`${this.root}/claims/action/${data._id}`, data, this.getHeaders()).subscribe(res => {
            this.userResponse = res;;
            subject.next(this.userResponse);
        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // function for get the all forums sk

    forumList(): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/posts/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    topicById(id): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.post(`${this.root}/posts/byId/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    addForums(model): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.post(`${this.root}/posts/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteTags(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        let a;
        this.http.delete(`${this.root}/tags/remove/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    getTags(): Observable<Category[]> {
        const subject = new Subject<Category[]>();
        this.http.get(`${this.root}/tags/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getTagsByCategory(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/tags/byCategoryId?catrgoryIds=${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    // delete post

    deletePost(id): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        let t;
        this.http.put(`${this.root}/posts/remove/${id}`, t, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    updateForum(model): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.put(`${this.root}/posts/update/${model._id}`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    // find duplicay
    Duplicacy(model): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.get(`${this.root}/providers/findDuplicate?email=${model.email}&name=${model.name}&phoneNumber=${model.phoneNumber}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // merge duplicacy     
    mergeDuplicacy(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/providers/margeDuplicate`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // get ambassadors

    ambassadorsList(): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/ambassador/getAmbassadors`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    pointsList(): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/ambassador/getActivities`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    // delete Activity
    deleteActivity(id): Observable<User[]> {
        const subject = new Subject<User[]>();
        let t;
        this.http.delete(`${this.root}/ambassador/deleteActivity/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);

        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // update activity
    updateActivity(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/ambassador/updateActivity/${model._id}`, model).subscribe(res => {
            this.userResponse = res;
            subject.next(this.userResponse);

        }, error => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }



    addRemoveAmbassador(model): Observable<Userr> {
        const subject = new Subject<Userr>();
        this.http.post(`${this.root}/ambassador/addOrRemove`, model, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);

        });

        return subject.asObservable();
    }
    // get ambassadors

    ambassadorsPointsList(): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/ambassador/getAmbassadors`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // adjust points   
    addAdjust(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/ambassador/addActivityPoint`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // service for get alerts

    alertList(): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/alert/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // ADD alert  

    addAlert(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/alert/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteAlert(id): Observable<User[]> {
        const subject = new Subject<User[]>();
        let t;
        this.http.delete(`${this.root}/alert/deleteAlert/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // for badges


    addBadge(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/badges/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteBadge(id): Observable<User[]> {
        const subject = new Subject<User[]>();
        let t;
        this.http.delete(`${this.root}/badges/deleteBadge/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);

        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    badgeList(): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/badges/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getProvidersBy(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/programs/publishedOrUnPublishedPrograms`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // published program list

    getPublished(model): Observable<Userr[]> {
        const subject = new Subject<Userr[]>();
        this.http.get(`${this.root}/programs/publishedOrUnPublishedPrograms?userId=${model.userId}&programType=${model.programType}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    PublishedProgram(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        console.log(model)
        this.http.put(`${this.root}/programs/publish?programId=${model.programId}&isPublished=${model.isPublished}`, '', this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    publishUnpublishMultiplePrograms(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/programs/bulkPublishOrUnpublish`, model, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    expireMultiplePrograms(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/programs/bulkExpire`, model, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }



    getPublishedProgram(pageNo, pageSize, programType): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.get(`${this.root}/programs/listPublishOrUnpublish?pageNo=${pageNo}&pageSize=${pageSize}&programType=${programType}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // ---------------------------------------------Expiring soon program ------------------------------------------------------------
    getExpiringProgram(pageNo, pageSize): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.get(`${this.root}/programs/expiresInWeek?pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // ---------------------------------------------Expired program ------------------------------------------------------------
    allExpiredProgram(): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.get(`${this.root}/programs/expired`, this.getHeaders()).subscribe((responseData: any) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    setExpired(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/programs/expireProgram`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    addFeature(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/feature/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.ForumResponse = responseData;
            subject.next(this.ForumResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // get features list
    featureList(): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/feature/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteFeature(id): Observable<User[]> {
        const subject = new Subject<User[]>();
        let t;
        this.http.delete(`${this.root}/feature/deleteFeature/${id}`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- search category -------------------------->

    searchCategory(key): Observable<Category> {
        const subject = new Subject<Category>();
        this.http.get(`${this.root}/categories/search?name=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    feedbackList(): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/feedback/list`, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // =========================feedback survey API's START----------------------------
    feedbackSurveyList(): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/justfeedback/list`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    feedbackSurveyCreate(data): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/justfeedback/create`, data, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    feedbackSurveyUpdate(data): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/justfeedback/update`, data, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    feedbackSurveyDelete(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.delete(`${this.root}/justfeedback/deleteFeedback/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    // =========================feedback survey API's END----------------------------

    programCSVupload(csv): Observable<any> {
        const subject = new Subject<any>();
        this.http.post(`${this.root}/programs/uploadExcel`, csv, { headers: null }).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);

        });

        return subject.asObservable();
    }

    providerCSVupload(csv): Observable<any> {
        const subject = new Subject<any>();
        this.http.post(`${this.root}/providers/uploadExcel`, csv, { headers: null }).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);

        });

        return subject.asObservable();
    }

    //=========================feedback survey API's START----------------------------
    getRoles(): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/role/list`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    //=========================getParentAnalytics by Id API----------------------------
    getParentAnalytics(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/parents/getSearchHistory/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    //=========================getfreeTextByParentId  API----------------------------
    getfreeTextByParentId(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/freetextSearch/listByParentId/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    // =============================================Graph analytics Programs ====================================================
    analyticsGraphProgram(value): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/histogram?period=${value}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    // =============================================Graph analytics Providers ====================================================
    analyticsGraphProviders(value): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/providers/histogram?period=${value}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    // Filter Keywords CRUD   ==========================================================================================
    addKeyword(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/filterkeys/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    searchMultipleKeywords(key): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/freetextSearch/search?text=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            if (responseData.isSuccess) {
                this.userResponse = responseData;
                subject.next(this.userResponse);
            }
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    updateKeyword(id, data): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/filterkeys/update/${id}`, data, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    deleteKeyword(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.delete(`${this.root}/filterkeys/deleteFilterkey/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getKeyword(): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/filterkeys/list`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    getKeywordSearchedList(): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/freetextSearch/list`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    deleteSearchedFreeText(id): Observable<any> {
        const subject = new Subject<any>();
        this.http.delete(`${this.root}/freetextSearch/remove/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    keyWordActivateDeactivate(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/filterkeys/activeOrDeactive?id=${model.id}&isActivated=${model.isActivated}`, '', this.getHeaders()).subscribe((responseData) => {
            // this.getHeaders() 
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    //=============================================== search Topic crud ========================================
    getTopics(): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/searchTopics/list`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    addSearchTopic(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/searchTopics/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    updateSearchTopic(id, data): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/searchTopics/update/${id}`, data, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    topicActivateDeactivate(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/searchTopics/activeOrDeactive?id=${model.id}&isActivated=${model.isActivated}`, '', this.getHeaders()).subscribe((responseData) => {
            // this.getHeaders() 
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    deleteTopic(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.delete(`${this.root}/searchTopics/remove/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    searchTopic(key): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/searchTopics/search?name=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            if (responseData.isSuccess) {
                this.userResponse = responseData;
                subject.next(this.userResponse);
            }
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }

    //=============================================== search Topic crud ========================================
    getMetaService(): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/metaservice/list`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    addMetaService(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/metaservice/create`, model, this.getHeaders()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    updateMetaService(id, data): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/metaservice/update/${id}`, data, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    MetaServiceActivateDeactivate(model): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.put(`${this.root}/metaservice/activeOrDeactive?id=${model.id}&isActivated=${model.isActivated}`, '', this.getHeaders()).subscribe((responseData) => {
            // this.getHeaders() 
            this.categoryResponse = responseData;
            subject.next(this.categoryResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    deleteMetaService(id): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.delete(`${this.root}/metaservice/remove/${id}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    searchMetaService(key): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/metaservice/search?name=${key}`, this.getHeaders()).subscribe((responseData: any) => {
            if (responseData.isSuccess) {
                this.userResponse = responseData;
                subject.next(this.userResponse);
            }
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    //=============================================== Active Programs ========================================
    getActiveProgramCount(pageNo, pageSize): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/providers/activePrograms?pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeaders()).subscribe((responseData: any) => {
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


}


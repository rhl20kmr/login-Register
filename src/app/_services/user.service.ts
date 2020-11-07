import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`/registerusers/`, user);
    }

    registerList(userlist:any){
        console.log('userlist..',userlist);
        return this.http.post(`/users/registerlist`, userlist);
    }

    getregisterList(){
        
        return this.http.get<any[]>(`/registerlist`);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }

    deleteRegList(id: number) {
        return this.http.delete(`/reglistdelete/${id}`);
    }
    
}
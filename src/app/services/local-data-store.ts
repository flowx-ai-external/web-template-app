import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ClientStoreInterface } from '@flowx/core-sdk';

@Injectable({
    providedIn: 'root',
})
export class LocalDataStoreService implements ClientStoreInterface {
    #data: Record<string, any> = {};

    set data(data: Record<string, any>) {
        this.#data = data;
        this.dataStore.next(this.#data);
    }

    get data(): Record<string, any> {
        return this.#data;
    }

    dataStore: BehaviorSubject<Record<string, any>> = new BehaviorSubject<
        Record<string, any>
        >(this.data);

    readonly data$: any = this.dataStore.asObservable();

    /**
     * Set the data store equal to the data object
     * @param data object to set as data
     */
    setData(data: Record<string, any>): void {
        this.data = data;
        this.data$
    }

    /**
     * Use to add / update data in the existing
     * data store object.
     *
     * Shallow merges the given object with the data store
     * (the values for the root keys will be updated)
     * @param data data to be shallow merged
     */
    updateData(data: Record<string, any>): void {
        this.data = {
            ...this.data,
            ...data,
        };
    }

    reset(): void {
        this.setData({});
    }
}

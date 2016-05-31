import {AbstractStorage} from "./abstract.storage";
/**
 * @author DucNguyenMinh
 * @since 13/05/16
 */

export class DelegateStorage extends AbstractStorage {


    /**
     * @param _nativeStorage browser's native implementation
     */
    constructor(private _nativeStorage:Storage) {
        super();
    }

    clear():void {
        this._nativeStorage.clear();
    }

    getItem(key:string):any {
        return this._nativeStorage.getItem(key);
    }

    key(index:number):string {
        return this._nativeStorage[index];
    }

    removeItem(key:string):void {
        this._nativeStorage.removeItem(key);
    }

    setItem(key:string, data:string):void {
        this._nativeStorage.setItem(key, data);
    }

}
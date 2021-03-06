/**
 * @author DucNguyenMinh
 * @since 13/05/16
 */

export abstract class AbstractStorage {
    length: number;
    [key: string]: any;
    [index: number]: string;
    abstract clear():void;
    abstract getItem(key: string): any;
    abstract key(index:number): any;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, data: string): void;
}

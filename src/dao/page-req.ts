
export default class PageReq {
    constructor(
        private _page:number = 1,
        private _size:number = 10
    ) {}


    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }
}



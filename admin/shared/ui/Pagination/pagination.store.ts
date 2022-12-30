import { action, makeObservable, observable } from "mobx";

export class PaginationStore {
    totalPages: number = 0;
    currentPage: number = 1;
    pageSize: number = 10;

    constructor() {
        makeObservable(this, {
            currentPage: observable,
            totalPages: observable,
            pageSize: observable,
            nextPage: action("Go to next page"),
            prevPage: action("Go to prev page"),
            gotoPage: action("Go to specific page"),
            setPageSize: action("Set specific page size"),
        });
    }

    public reset = () => {
        this.totalPages = 0;
        this.currentPage = 1;
        this.pageSize = 10;
    };

    public nextPage = (totalPages: number) => {
        if (this.currentPage <= totalPages) {
            this.currentPage = this.currentPage + 1;
            return;
        }
    };

    public prevPage = () => {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            return;
        }
    };

    public gotoPage = (page: number) => {
        if (page !== this.currentPage) {
            this.currentPage = page;
            return;
        }
    };

    public setPageSize = (size: number) => {
        if (size !== this.pageSize) {
            this.pageSize = size;
            return;
        }
    };

    public setTotalPages = (totalPages: number) => {
        this.totalPages = totalPages;
    };

    public getPageSize = () => {
        return this.pageSize;
    };

    public getCurrentPage = () => {
        return this.currentPage;
    };

    public getTotalPages = () => {
        return this.totalPages;
    };
}

import { makeAutoObservable } from "mobx";
import axios, {AxiosResponse} from "axios";

export interface IComment {
    by: string;
    id: number;
    kids?: number[],
    parent: number;
    text: string;
    time: number;
    type: string
}

class Comments {
    comments: IComment[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    private flash(): void {
        this.comments = []
    }

    private async fetchPostById(id: number): Promise<void> {
        try {
            const response: AxiosResponse<IComment> = await axios.get(`/item/${id.toString()}.json`);
            const { data } = response;
            this.comments.push(data);
        } catch (error) {
            console.error(error);
        }
    }

    async fetchAllComments(ids: number[]): Promise<void> {
        this.flash()
        await Promise.all(ids.map(id => this.fetchPostById(id)));
    }
}

export default new Comments();

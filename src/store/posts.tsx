import { makeAutoObservable } from "mobx";
import axios, {AxiosResponse} from "axios";

export interface IPost {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

class Posts {
    posts: IPost[] = [];
    private limit = 100;

    constructor() {
        makeAutoObservable(this);
    }

    private flash(): void {
        this.posts = []
    }

    private async fetchPostsIds(): Promise<number[]> {
        return await axios.get("/newstories.json").then(
            ({data}: AxiosResponse<number[]>) => data.slice(0, this.limit)
        )
    }

    private async fetchPostById(id: number): Promise<void> {
        try {
            const response: AxiosResponse<IPost> = await axios.get(`/item/${id.toString()}.json`);
            const { data } = response;
            this.posts.push(data);
        } catch (error) {
            console.error(error);
        }
    }

    async fetchAllPosts(): Promise<void> {
        this.flash()
        const ids = await this.fetchPostsIds();
        await Promise.all(ids.map(id => this.fetchPostById(id)));
    }
}

export default new Posts();

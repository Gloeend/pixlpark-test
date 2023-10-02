import {memo, useEffect, useState} from "react";
import c from "./style.module.css";
import {useNavigate, useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {IPost} from "@store/posts.tsx";
import {Button} from "antd";
import unixToDateFormat from "@utils/unixToDateFormat.tsx";
import CommentsComponent from "@components/comments-component/comments-component.tsx";

const Item = () => {
    const {id} = useParams();
    const [post, setPost] = useState<IPost>({} as IPost);
    const [isLoading, setLoading] = useState(true)
    const nav = useNavigate();
    useEffect(() => {
        void axios.get(`/item/${id as string}.json`).then(
            (r: AxiosResponse<IPost>) => {
                setPost(r.data)
                setLoading(false)
            }
        )
    }, [])

    return !isLoading ? (
        <>
            <Button onClick={() => nav("/")}>To posts</Button>

            <h1>
                {post.title}
            </h1>

            <ul className={c.list}>
                <li><span>Date: {unixToDateFormat(post.time)}</span></li>
                <li><span>Creator: {post?.by}</span></li>
            </ul>

            {
                post.kids !== undefined ?
                    <>
                        <p>Comments: {post.kids.length}</p>
                        <CommentsComponent ids={post.kids}></CommentsComponent>
                    </> : <span>No comments!</span>
            }
        </>
    ) : <span>loading...</span>
}

export default memo(Item);
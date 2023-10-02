import {Fragment, useEffect, useState} from "react";
import Posts, {IPost} from "@store/posts.tsx";
import {observer} from "mobx-react-lite";
import { v4 as uuidv4 } from "uuid";
import PostComponent from "@components/post-component/post-component.tsx";
import {Button} from "antd";

const Home = observer(() => {
    const [posts, setPosts] = useState(Posts.posts);

    function loadPosts() {
        void Posts.fetchAllPosts().then(
            _ => setPosts(Posts.posts)
        )
    }

    useEffect(() => {
        loadPosts()
        setInterval(() => {
            loadPosts()
        }, 60000)
    }, [])

    return (
        <>
            <Button onClick={() => loadPosts()}>Update</Button>
            <section>
                <ul>
                    {
                        posts.map((el: IPost) => <Fragment key={uuidv4()}><li><PostComponent {...el}>{ el.title }</PostComponent></li></Fragment>)
                    }
                </ul>
            </section>
        </>
    )
});

export default Home;
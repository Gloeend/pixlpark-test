import {FC, Fragment, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import c from "./style.module.css";
import {IComment} from "@store/comments.tsx";
import {observer} from "mobx-react-lite";
import Comments from "@store/comments.tsx";
import {Button} from "antd";

interface IProps {
    ids: number[]
}

const CommentsComponent: FC<IProps> = observer(({ids}) => {
    const [comments, setComments] = useState<IComment[]>([])
    const [isLoading, setLoading] = useState(true)

    async function load() {
        setLoading(true)
        await Comments.fetchAllComments(ids).then(_ => {
            setComments(Comments.comments)
            setLoading(false)
        })
    }

    useEffect(() => {
        void load()
    }, [])

    return !isLoading ? (
        <>
            <Button className="mt-4" onClick={() => {void load()}}>Update</Button>
            <ul className={c.list}>

                {
                    comments.map(
                        (el: IComment) => (
                            <Fragment key={uuidv4()}>
                                <Comment {...el} />
                            </Fragment>
                        )
                    )
                }
            </ul>
        </>
    ) : <span>loading...</span>
})

const Comment: FC<IComment> = ({text, by, kids}) => {
    const [load, setLoad] = useState(false);


    return (
        <li onClick={() => setLoad(true)}>
            <div className={c.item}>
                <span>By: {by}</span>
                <p>{text}</p>
            </div>
            {
                kids && load ? <CommentsComponent ids={kids}></CommentsComponent> : null
            }
        </li>
    )
};

export default CommentsComponent;
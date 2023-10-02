import {IPost} from "@store/posts.tsx";
import c from "./style.module.css";
import {FC, memo} from "react";
import classnames from "@utils/classnames.ts";
import {Link} from "react-router-dom";
import unixToDateFormat from "@utils/unixToDateFormat.tsx";

const PostComponent: FC<IPost> = ({
    by,
    score,
    title,
    id,
    time
}) => {
    const url = "/item/" + id.toString()

    return (
        <Link className={classnames(c.item, "shadow")} to={url}>
            <h3>{ title }</h3>
            <p>Score: { score }</p>
            <p>Published by: { by }</p>
            <p>Published date: { unixToDateFormat(time) }</p>
        </Link>
    )
};

export default memo(PostComponent);
import React from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import { Posts } from "../dummyData";

export default function Feed() {
    const myPosts = Posts.map(x=>
            <Post 
                key={x.id}
                desc={x.desc}
                img={x.photo}
                date={x.date}
                user={x.user}
                room={x.room}
                roomers={x.roomers}
                vote={x.vote}
                commentNum={x.commentNum}
                comments={x.comments}
                />
        )
    return(
        <>
            <Navbar />
            <div className="feed">
                {myPosts}
            </div>
        </>
    )
}
import React from 'react';
import CookImg from '../../../assets/cooker.svg'

export default function CommentCard({ comment }) {
    return (
        <div id="commentCard" className="flex flex-row items-center">
            <img src={CookImg} alt="account image" width={75} />
            <div className="pl-5">
                <h1 className="font-normal text-xl">{comment.name}</h1>
                <p>{comment.commentText}</p>
            </div>
        </div>
    )
}
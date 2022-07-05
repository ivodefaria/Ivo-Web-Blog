import { Fragment } from "react";
import Head from "next/head";

import Posts from "../../components/posts/posts";
import { getAllposts } from "../../lib/posts-util";

function PostsPage(props) {
    return (
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta name="description" content="A list of all Design and Programming posts!"/>
            </Head>
            <Posts posts={props.posts} />
        </Fragment>
    );
}

export function getStaticProps() {
    const allPosts = getAllposts();
    
    return {
        props: {
            posts: allPosts
        }
    }
}


export default PostsPage;
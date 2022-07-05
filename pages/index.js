import { Fragment } from "react";
import Head from "next/head";
import FeaturedPosts from "../components/homepage/Featured-posts";
import Hero from "../components/homepage/hero";

import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Ivo' WEB Blog</title>
                <meta name="description" content="I post about Design and Web Development"/>
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts}/>
        </Fragment>
    );
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();
    
    return {
        props: {
            posts: featuredPosts
        }
    }
}

export default HomePage;
import PostsGrid from "./posts-grid";
import classes from "./posts.module.css";

function Posts(props) {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={props.posts} />
        </section>
    );
}

export default Posts;
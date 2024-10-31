const POST_URL = "https://jsonplaceholder.typicode.com/posts";

interface Comment {
    postId: number;
    id: number;
    email: string;
    body: string;
}

interface Post {
    postId: number;
    title: string;
    comments: Comment[];
}

export async function getPosts(userId: number | string): Promise<Post[]> {
    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    const postsData = (await postsResponse.json()) as Post[];
    // console.log("🚀 ~ getPosts ~ postsData:", postsData);

    const postsWithComments = await Promise.all(
        postsData.map(async (post : any) => {
            const commentsResponse = await fetch(
                `${POST_URL}/${post.id}/comments`
            );
            const commentsData = (await commentsResponse.json()) as Comment[];

            const filteredComments = commentsData.map((comment) => ({
                postId: comment.postId,
                id: comment.id,
                email: comment.email,
                body: comment.body,
            }));

            return {
                postId: post.id,
                title: post.title,
                comments: filteredComments,
            };
        })
    );

    // console.log(postsWithComments);
    return postsWithComments;
}

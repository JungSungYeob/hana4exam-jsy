import assert from "assert";
import { getPosts } from "./ex7";

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

async function test(userId: string | number) {
    const posts = await getPosts(userId);
    assert.strictEqual(posts?.at(-1)?.comments?.length, 5);
    assert.deepStrictEqual(posts[0], {
        postId: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        comments: [
            {
                postId: 1,
                id: 1,
                email: "Eliseo@gardner.biz",
                body:
                    "laudantium enim quasi est quidem magnam voluptate ipsam eos\n" +
                    "tempora quo necessitatibus\n" +
                    "dolor quam autem quasi\n" +
                    "reiciendis et nam sapiente accusantium",
            },
            {
                postId: 1,
                id: 2,
                email: "Jayne_Kuhic@sydney.com",
                body:
                    "est natus enim nihil est dolore omnis voluptatem numquam\n" +
                    "et omnis occaecati quod ullam at\n" +
                    "voluptatem error expedita pariatur\n" +
                    "nihil sint nostrum voluptatem reiciendis et",
            },
            {
                postId: 1,
                id: 3,
                email: "Nikita@garfield.biz",
                body:
                    "quia molestiae reprehenderit quasi aspernatur\n" +
                    "aut expedita occaecati aliquam eveniet laudantium\n" +
                    "omnis quibusdam delectus saepe quia accusamus maiores nam est\n" +
                    "cum et ducimus et vero voluptates excepturi deleniti ratione",
            },
            {
                postId: 1,
                id: 4,
                email: "Lew@alysha.tv",
                body:
                    "non et atque\n" +
                    "occaecati deserunt quas accusantium unde odit nobis qui voluptatem\n" +
                    "quia voluptas consequuntur itaque dolor\n" +
                    "et qui rerum deleniti ut occaecati",
            },
            {
                postId: 1,
                id: 5,
                email: "Hayden@althea.biz",
                body:
                    "harum non quasi et ratione\n" +
                    "tempore iure ex voluptates in ratione\n" +
                    "harum architecto fugit inventore cupiditate\n" +
                    "voluptates magni quo et",
            },
        ],
    });

    // 추가 테스트 코드를 작성하시오.

    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    const postsData = (await postsResponse.json()) as Post[];
    // console.log("🚀 ~ test ~ postsData:", postsData)

    //반환된 posts의 길이와 새롭게 fetch 받은 posts만의 길이는 같다
    assert.strictEqual(posts?.length, postsData?.length);
    //쟉성자 글의 title 모두 비교
    posts.forEach((post, index) => {
        assert.strictEqual(post?.title, postsData[index].title);
    });
}

test(1);

//getPosts의 title과 직접 fetch한 데이터의 title 비교
async function testTitle(userId: string | number) {
    const posts = await getPosts(userId);
    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    const postsData = (await postsResponse.json()) as Post[];

    //반환된 posts의 길이와 새롭게 fetch 받은 posts만의 길이는 같다
    assert.strictEqual(posts?.length, postsData?.length);
    //쟉성자 글의 title 모두 비교
    posts.forEach((post, index) => {
        assert.strictEqual(post?.title, postsData[index].title);
    });
}

for (let i = 1; i <= 10; i += 1) {
    testTitle(i);
}

//모든 comments들 비교하는 테스트 케이스
async function testComments(userId: string | number) {
    const posts = await getPosts(userId);

    for (let post of posts) {
        const commentsResponse = await fetch(
            `${POST_URL}/${post.postId}/comments`
        );
        const commentsData = (await commentsResponse.json()) as Comment[];
        const filteredComments = commentsData.map((comment) => ({
            postId: comment.postId,
            id: comment.id,
            email: comment.email,
            body: comment.body,
        }));

        assert.deepStrictEqual(post?.comments, filteredComments);
    }
}

for (let i = 1; i <= 10; i += 1) {
    testComments(i);
}

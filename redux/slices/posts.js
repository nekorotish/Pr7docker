import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/postgresql/posts');
    // const { data } = await axios.get('/posts');
    // console.log(data)
    // console.log("da")
    return data;
});
export const fetchPostsDiscover = createAsyncThunk('posts/fetchPostsDiscover', async () => {
    const {data} = await axios.get('/postgresql/postsdiscover');
    return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags');
    // console.log(data)
    return data;
});
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    await axios.delete(`/postgresql/posts/${id}`);
});
export const fetchCategoryPost = createAsyncThunk('posts/fetchCategoryPost', async (category) => {
    const {data} = await axios.get(`/postgresql/posts/category/${category}`);
    // console.log("data category", data)
    return data;
});
export const fetchUserPost = createAsyncThunk('posts/fetchUserPost', async (id) => {
    // const { data } = await axios.get(`/posts/user/${id}`);
    const {data} = await axios.get(`/postgresql/posts/user/${id}`);
    // console.log("#########################################")
    // console.log(data)
    // console.log("#########################################")
    return data;
});
export const fetchUserPostsForAccountView = createAsyncThunk('posts/fetchUserPostsForAccountView', async (id) => {
    // const { data } = await axios.get(`/posts/user/${id}`);
    const {data} = await axios.get(`/postgresql/posts/user/${id}`);
    // console.log("#########################################")
    // console.log(data)
    // console.log("#########################################")
    return data;
});
export const fetchLikePost = createAsyncThunk('posts/fetchLikePost', async ({id, userid}) => {
    // console.log("______________________________________________∂")
    // console.log(id)
    // console.log(userid)
    // console.log("______________________________________________∂")
    const {data} = await axios.patch(`/postgresql/posts/like/${id}`, {userid});
    // console.log(data)
    return data;


});
export const fetchDisLikePost = createAsyncThunk('posts/fetchDisLikePost', async ({id, userid}) => {
    // console.log("______________________________________________")
    // console.log(userid)
    // console.log(id)
    // console.log("______________________________________________")

    const {data} = await axios.patch(`/postgresql/posts/dislike/${id}`, {userid});
    // console.log(data)
    return data;

});
export const fetchOnePost = createAsyncThunk('posts/fetchOnePost', async (id) => {
    const {data} = await axios.get(`/postgresql/posts/${id}`)
    // const { data } = await axios.get(`/posts/${id}`)
    // console.log("?????????????")
    // console.log(data)
    // console.log("?????????????")
    return data;

});
export const fetchUserLikePosts = createAsyncThunk('posts/fetchUserLikePosts', async (id) => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.get(`/postgresql/posts/like/${id}`)

    // console.log(data)
    return data;

});
export const fetchUserLikePostsForView = createAsyncThunk('posts/fetchUserLikePostsForView', async (id) => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.get(`/postgresql/posts/like/${id}`)

    // console.log(data)
    return data;

});
export const fetchUserDataSuperDuper = createAsyncThunk('posts/fetchUserDataSuperDuper', async (user_id) => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.get(`/postgresql/user/${user_id}`)
    return data;

});
export const fetchBannedPosts = createAsyncThunk('posts/fetchBannedPosts', async () => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.get(`/postgresql/posts/ban_post/get`)
    return data;

});
export const fetchUnBanPost = createAsyncThunk('posts/fetchUnBanPost', async (id) => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.post(`/postgresql/posts/unban_post/${id}`)
    return data;

});
export const fetchUpdateBannedPost = createAsyncThunk('posts/fetchUpdateBannedPost', async (id) => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.post(`/postgresql/posts/ban_post/update/${id.id}`, id)
    return data;

});
export const fetchBanPost = createAsyncThunk('posts/fetchBanPost', async (id) => {
    // const { data } = await axios.get(`/posts/like/${id}`)
    const {data} = await axios.post(`/postgresql/posts/ban_post/${id.id}`, id)
    return data;

});
export const fetchUserBannedPosts = createAsyncThunk('posts/fetchUserBannedPosts', async (id) => {
    const {data} = await axios.get(`/postgresql/posts/ban_post/get/${id}`)
    return data;

});
export const fetchBannedPostDetail = createAsyncThunk('posts/fetchBannedPostDetail', async (id) => {
    const {data} = await axios.get(`/postgresql/posts/ban_post/get_post/detail/${id}`)
    return data;

});
const initialState = {
    // api_url: "http://192.168.0.185:4444",
    api_url: "http://192.168.0.14:4444",
    // api_url: "http://192.168.0.53:4444",
    // api_url: "http://172.20.10.3:4444",
    postgres: 1,
    // api_url:"http://172.20.10.3:4444",
    posts: {
        items: [],
        status: 'loading'
    },
    postsDiscover: {
        items: [],
        status: 'loading'
    },
    get_user: {
        user_data_get: [],
        status: 'loading'
    },
    get_user_posts_for_view: {
        items: [],
        status: 'loading'
    },
    get_user_likes_posts_for_view: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    monochromatic_posts: {
        items: [],
        status: 'loading'
    },
    user_posts: {
        items: [],
        status: 'loading'
    },
    one_posts: {
        items: [],
        status: 'loading'
    },
    user_likes_posts: {
        items: [],
        status: 'loading'
    },
    banned_posts: {
        items: [],
        status: 'loading'
    },
    user_banned_posts: {
        items: [],
        status: 'loading'
    },
    banned_post_detail: {
        items: [],
        status: 'loading'
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //считывание постов
        builder.addCase(fetchPosts.pending, (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                console.log("postgers")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,
                        user_id: post.user_id,
                        createdAt: post.createdat,
                        updatedAt: post.updatedat,
                        category: post.category,
                        likeCount: post.likecount

                    };
                });

                state.posts.items = postsget;
                // console.log(state.posts.items)
                state.posts.status = 'loaded';
            } else {
                console.log("all ok")

                state.posts.items = action.payload;
                state.posts.status = 'loaded';

            }

        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        });
        builder.addCase(fetchPostsDiscover.pending, (state) => {
            state.postsDiscover.items = [];
            state.postsDiscover.status = 'loading';
        });
        builder.addCase(fetchPostsDiscover.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                console.log("postgers")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount  // Присваиваем likeCount из like_count

                        // Добавьте остальные поля по аналогии
                    };
                });

                state.postsDiscover.items = postsget;
                // console.log(state.posts.items)
                state.postsDiscover.status = 'loaded';
            } else {
                console.log("all ok")

                state.postsDiscover.items = action.payload;
                state.postsDiscover.status = 'loaded';

            }

        });
        builder.addCase(fetchPostsDiscover.rejected, (state) => {
            state.postsDiscover.items = [];
            state.postsDiscover.status = 'error';
        });
        //считывание тегов
        builder.addCase(fetchTags.pending, (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        });
        builder.addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        });

        builder.addCase(fetchUserDataSuperDuper.pending, (state) => {
            state.get_user.user_data_get = [];
            state.get_user.status = 'loading';
        });
        builder.addCase(fetchUserDataSuperDuper.fulfilled, (state, action) => {
            state.get_user.user_data_get = action.payload;
            state.get_user.status = 'loaded';
        });
        builder.addCase(fetchUserDataSuperDuper.rejected, (state) => {
            state.get_user.user_data_get = [];
            state.get_user.status = 'error';
        });

        //Удаление постов
        builder.addCase(fetchRemovePost.pending, (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        });

        builder.addCase(fetchCategoryPost.pending, (state) => {
            state.monochromatic_posts.items = [];
            state.monochromatic_posts.status = 'loading';
        });
        builder.addCase(fetchCategoryPost.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                console.log("postgers")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby
                        // Добавьте остальные поля по аналогии
                    };
                });

                state.monochromatic_posts.items = postsget;
                // console.log(state.monochromatic_posts.items)
                state.monochromatic_posts.status = 'loaded';
            } else {
                console.log("all ok")

                state.monochromatic_posts.items = action.payload;
                state.monochromatic_posts.status = 'loaded';

            }
            // state.monochromatic_posts.items = action.payload;
            // state.monochromatic_posts.status = 'loaded';
        });
        builder.addCase(fetchCategoryPost.rejected, (state) => {
            state.monochromatic_posts.items = [];
            state.monochromatic_posts.status = 'error';
        });


        builder.addCase(fetchUserPost.pending, (state) => {
            state.user_posts.items = [];
            state.user_posts.status = 'loading';
        });
        builder.addCase(fetchUserPost.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                // console.log("postgers userposts")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby
                        // Добавьте остальные поля по аналогии
                    };
                });

                state.user_posts.items = postsget;
                // console.log(state.user_posts.items)
                state.user_posts.status = 'loaded';
            } else {
                // console.log("All OK userposts")
                state.user_posts.items = action.payload;
                state.user_posts.status = 'loaded';
            }

        });
        builder.addCase(fetchUserPost.rejected, (state) => {
            state.user_posts.items = [];
            state.user_posts.status = 'error';
        });
        builder.addCase(fetchUserPostsForAccountView.pending, (state) => {
            state.get_user_posts_for_view.items = [];
            state.get_user_posts_for_view.status = 'loading';
        });
        builder.addCase(fetchUserPostsForAccountView.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                // console.log("postgers userposts")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby
                        // Добавьте остальные поля по аналогии
                    };
                });

                state.get_user_posts_for_view.items = postsget;
                // console.log(state.user_posts.items)
                state.get_user_posts_for_view.status = 'loaded';
            } else {
                // console.log("All OK userposts")
                state.get_user_posts_for_view.items = action.payload;
                state.get_user_posts_for_view.status = 'loaded';
            }

        });
        builder.addCase(fetchUserPostsForAccountView.rejected, (state) => {
            state.get_user_posts_for_view.items = [];
            state.get_user_posts_for_view.status = 'error';
        });

        //получение одного поста
        builder.addCase(fetchOnePost.pending, (state) => {
            state.one_posts.items = [];
            state.one_posts.status = 'loading';
        });
        builder.addCase(fetchOnePost.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                const post = action.payload;  // Assuming action.payload contains a single photos

                const postDetails = {
                    imageUrl: post.imageurl,
                    _id: post._id,
                    title: post.title,
                    text: post.text,
                    tags: post.tags,
                    viewsCount: post.viewscount,
                    user_id: post.user_id,
                    createdAt: post.createdat,
                    updatedAt: post.updatedat,
                    category: post.category,
                    likeCount: post.likecount,
                    likedBy: post.likedby,
                    CameraCompany: post.cameracompany,
                    Model: post.model,
                    ShutterSpeed: post.shutterspeed,
                    Aperture: post.aperture,
                    FocalLength: post.focallength,
                    ISO: post.isocam,
                    Dimensions: post.dimensions,
                    // Add other fields as needed
                };
                // console.log("ALLLLL NOTT OKOKOKO")

                state.one_posts.items = postDetails;  // Using "item" instead of "items" for a single photos
                state.one_posts.status = 'loaded';
            } else {
                // console.log("ALLLLL AOKOK")
                state.one_posts.items = action.payload;  // Using "item" instead of "items" for a single photos
                state.one_posts.status = 'loaded';
            }
        });
        builder.addCase(fetchOnePost.rejected, (state) => {
            state.one_posts.items = [];
            state.one_posts.status = 'error';
        });


        //Получение лайконых постов
        builder.addCase(fetchUserLikePosts.pending, (state) => {
            state.user_likes_posts.items = [];
            state.user_likes_posts.status = 'loading';
        });
        builder.addCase(fetchUserLikePosts.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                console.log("postgers likeposts")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby
                        // Добавьте остальные поля по аналогии
                    };
                });
                // console.log("???????????????")
                // console.log(postsget)
                // console.log("???????????????")
                state.user_likes_posts.items = postsget;
                // console.log(state.user_posts.items)
                state.user_likes_posts.status = 'loaded';
            } else {
                console.log("All OK userposts")
                state.user_likes_posts.items = action.payload;
                state.user_likes_posts.status = 'loaded';
            }
            // state.user_likes_posts.items = action.payload;
            // state.user_likes_posts.status = 'loaded';
        });
        builder.addCase(fetchUserLikePosts.rejected, (state) => {
            state.user_likes_posts.items = [];
            state.user_likes_posts.status = 'error';
        });
        builder.addCase(fetchUserLikePostsForView.pending, (state) => {
            state.get_user_likes_posts_for_view.items = [];
            state.get_user_likes_posts_for_view.status = 'loading';
        });
        builder.addCase(fetchUserLikePostsForView.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                console.log("postgers likeposts")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby
                        // Добавьте остальные поля по аналогии
                    };
                });
                // console.log("???????????????")
                // console.log(postsget)
                // console.log("???????????????")
                state.get_user_likes_posts_for_view.items = postsget;
                // console.log(state.user_posts.items)
                state.get_user_likes_posts_for_view.status = 'loaded';
            } else {
                console.log("All OK userposts")
                state.get_user_likes_posts_for_view.items = action.payload;
                state.get_user_likes_posts_for_view.status = 'loaded';
            }
            // state.user_likes_posts.items = action.payload;
            // state.user_likes_posts.status = 'loaded';
        });
        builder.addCase(fetchUserLikePostsForView.rejected, (state) => {
            state.get_user_likes_posts_for_view.items = [];
            state.get_user_likes_posts_for_view.status = 'error';
        });
        builder.addCase(fetchBannedPosts.pending, (state) => {
            state.banned_posts.items = [];
            state.banned_posts.status = 'loading';
        });
        builder.addCase(fetchBannedPosts.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                // console.log("postgers likeposts")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby,
                        banned: post.banned,
                        admin_id: post.admin_id,
                        reasonofban: post.reasonofban
                        // Добавьте остальные поля по аналогии
                    };
                });

                state.banned_posts.items = postsget;
                state.banned_posts.status = 'loaded';
            } else {
                // console.log("All OK userposts")
                state.banned_posts.items = action.payload;
                state.banned_posts.status = 'loaded';
            }

        });
        builder.addCase(fetchBannedPosts.rejected, (state) => {
            state.banned_posts.items = [];
            state.banned_posts.status = 'error';
        });


        builder.addCase(fetchUserBannedPosts.pending, (state) => {
            state.user_banned_posts.items = [];
            state.user_banned_posts.status = 'loading';
        });
        builder.addCase(fetchUserBannedPosts.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                // console.log("postgers likeposts")
                const postsget = action.payload.map(post => {
                    return {
                        imageUrl: post.imageurl,  // Присваиваем imageUrl из imageurl
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        tags: post.tags,
                        viewsCount: post.viewscount,  // Присваиваем viewsCount из views_count
                        user_id: post.user_id,
                        createdAt: post.createdat,  // Присваиваем createdAt из created_at
                        updatedAt: post.updatedat,  // Присваиваем updatedAt из updated_at
                        category: post.category,
                        likeCount: post.likecount,  // Присваиваем likeCount из like_count
                        likedBy: post.likedby,
                        banned: post.banned,
                        admin_id: post.admin_id,
                        reasonofban: post.reasonofban
                        // Добавьте остальные поля по аналогии
                    };
                });

                state.user_banned_posts.items = postsget;
                state.user_banned_posts.status = 'loaded';
            } else {
                // console.log("All OK userposts")
                state.user_banned_posts.items = action.payload;
                state.user_banned_posts.status = 'loaded';
            }

        });
        builder.addCase(fetchUserBannedPosts.rejected, (state) => {
            state.user_banned_posts.items = [];
            state.user_banned_posts.status = 'error';
        });
        builder.addCase(fetchBannedPostDetail.pending, (state) => {
            state.banned_post_detail.items = [];
            state.banned_post_detail.status = 'loading';
        });
        builder.addCase(fetchBannedPostDetail.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                // console.log("postgers likeposts")
                // const postsget = action.payload;
                // state.items = [{
                //         imageUrl: photos.imageurl,  // Присваиваем imageUrl из imageurl
                //         _id: photos._id,
                //         title: photos.title,
                //         text: photos.text,
                //         tags: photos.tags,
                //         viewsCount: photos.viewscount,  // Присваиваем viewsCount из views_count
                //         user_id: photos.user_id,
                //         createdAt: photos.createdat,  // Присваиваем createdAt из created_at
                //         updatedAt: photos.updatedat,  // Присваиваем updatedAt из updated_at
                //         category: photos.category,
                //         likeCount: photos.likecount,  // Присваиваем likeCount из like_count
                //         likedBy: photos.likedby,
                //         banned: photos.banned,
                //         admin_id: photos.admin_id,
                //         reasonofban: photos.reasonofban
                //         // Добавьте остальные поля по аналогии
                // }]


                state.banned_post_detail.items = action.payload;
                state.banned_post_detail.status = 'loaded';
            } else {
                // console.log("All OK userposts")
                state.banned_post_detail.items = action.payload;
                state.banned_post_detail.status = 'loaded';
            }

        });
        builder.addCase(fetchBannedPostDetail.rejected, (state) => {
            state.banned_post_detail.items = [];
            state.banned_post_detail.status = 'error';
        });

    },
    // extraReducers: {
    //     [fetchPosts.pending]: (state) => {
    //         state.posts.items = [];
    //         state.posts.status = 'loading';
    //     },
    //     [fetchPosts.fulfilled]: (state, action) => {
    //         state.posts.items = action.payload;
    //         state.posts.status = 'loaded';
    //     },
    //     [fetchPosts.rejected]: (state) => {
    //         state.posts.items = [];
    //         state.posts.status = 'error';
    //     },
    // },
});
export const postsReducer = postsSlice.reducer;
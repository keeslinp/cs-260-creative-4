Vue.filter('formatDate', function (value) {
	if (value) {
		return new Date(value).toLocaleDateString();
	}
});

var app = new Vue({
	el: '#app',
	data: {
		editMode: false,
		posts: {},
	},
	created() {
		this.getPosts();
	},
	computed: {
		orderedPosts() {
			Object.values(this.posts).sort((e1, e2) => e1.createDate > e2.createDate);
		},
	},
	methods: {
		editPost(id) {
			const index = this.posts.findIndex(post => post._id === id);
			this.posts[index].edit = true;
		},
		newPost() {
			console.log('test');
			this.posts.push({
				title: '',
				content: '',
				edit: true,
				createDate: Date.now(),
				updateDate: null,
			});
		},
		async getPosts() {
			try {
				let response = await axios.get("/api/posts");
				this.posts = response.data.map((post) => ({
					...post,
					edit: false,
				}));
			} catch (error) {
				console.log(error);
			}
		},
		async addPost(post) {
			try {
				let response = await axios.post("/api/posts", {
					title: post.title,
					content: post.content,
				});
				this.getPosts();
			} catch (error) {
				console.log(error);
			}
		},
		async savePost(post) {
			try {
				let response = await axios.put(`/api/posts/${post._id}`, post);
				this.getPosts();
			} catch (error) {
				console.log(error);
			}
		},
		async deletePost(post) {
			try {
				let response = await axios.delete("/api/posts/" + post._id);
				this.getPosts();
			} catch (error) {
				this.toggleForm();
			}
		}
	}
});

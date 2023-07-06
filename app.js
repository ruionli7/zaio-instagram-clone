console.log("Hello World!")

const outputPostStatus = (post) => {
    const output = `This post is ${
        post.isPublic ? "public" : "private"
      }, posted by ${post.username}, and currently has ${post.likes} likes and ${
        post.comments.length
      } comments.`;
      return output;
    };

const post = {
    username: "ruion",
    imageLink:
      "https://images.unsplash.com/photo-1581093458791-3b1c7e0c9d7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    caption: "This is a post",
    likes: 0,
    comments: [],
    shares: 0,
    isPublic: true,
    createdAt: "2020-02-07T17:00:00.000Z",
  };
  // output if the post can be shared or not
  //  if is public, "Post can be shared"
  //  if not public, "Post cannot be shared" 
  if(post.isPublic == true){
    console.log("Post can be shared");
  } else{
    console.log("post cannot be shared");
  }

// spread operator
// array of objects - feed
const feed = [
    post,
    { ...post, username: "johndoe" },
    { ...post, username: "janedoe" },
    { ...post, username: "elonmusk" },
  ];
  
  console.log("feed", feed);
  
  // CRUD - Create, Read, Update, Delete
  
  // READING ALL POSTS
  // array + anonyomous function: map
  const outputFeed = (feed) => {
    // return statuses of the posts
    // map function returns a new array of just the statuses
    const output = feed.map((p) => {
      console.log(outputPostStatus(p));
      return outputPostStatus(p);
    });
    // console.log(output);
  };
  
  outputFeed(feed);
  
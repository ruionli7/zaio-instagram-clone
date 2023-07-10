//asychronous code
/*console.log("1");
let a = 0;
setTimeout(()=> {
   console.log("2");
   a=2;
 }, 2000 );
console.log("3");
console.log(a=20)*/

const url ="https://jsonplaceholder.typicode.com/posts";

const fetchPostsWithPromises =  () => {
    console.log("fetching posts...");
    fetch(url)
    .then((response) => response.json())// promise being returned
    .then((data) => {//anything promise is being returned, we cn use the .then chaining to access the data from the promsie
        console.log(data[0]);
    })
    .catch((err) =>{
        console.log("there was an error in fetching the data", err);
    })
};

const fetchPostsWithAsync =async()=>{
    console.log("fetching posts...");
    const response = await fetch(url);
    const data = await response.json();
    console.log(data[0]);
}

fetchPostsWithAsync();

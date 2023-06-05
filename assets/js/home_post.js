{
    //method to submit form Data
    let createPost = function () {
        let newPostForm = $('#new-post-form')
        newPostForm.submit(function (e) {
            e.preventDefault()
            $.ajax({
                type: 'post',
                url: '/post/createPost',
                data: newPostForm.serialize(),
                success: function (data) { 
                    let newPost = newPostDOM(data.data.post)
                    $('#posts-list-container>ul').prepend(newPost)
                 },
                error: function (error) { console.log(error.responseText) }
            })
        })
    }
    // method to created a postin DOM
    let newPostDOM = function (post) {
        return $(`
        <li id="post-${post._id}">
    <p>
            <small>
                <a class="delete-post-button" href="/post/destroy/${post.id}">
                    X
                </a>
            </small>
            ${post.context}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
    </p>
        <div>

    </div>
    <div class="post-comment">
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type here to add Comment....." required>
                <input type="hidden" name="post" value="${ post._id }">
                <input type="submit" value="Add Comment">
            </form>
    </div>
    <div class="post-comment-list">
        <ul id="post-comment-${ post._id}">
        </ul>
    </div>
</li>
<hr>
<script src="../assets/js/home_post.js"></script>
        `)
    }
    // method to Delete a post

    let deletePost = function(deleteLink){
        
    }
    createPost()
}
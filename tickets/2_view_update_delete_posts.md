## Posts - Create a component that enables us to view, update, and delete posts

Context: Our users would like a way to update or delete a comment so the Internet doesn't forever remember their mistakes.

This ticket contains two separate parts:

- Update and Delete
  - There is no authentication so anyone can update or delete any post
- Create the React Component for the individual post page

What you need to implement:

- Update

  - Allow the user to edit the title and body (and image if you have added this feature)
    - IN PROGRESS: endpoint created, but will to implement for editting
  - Optionally, you could add a boolean `edited` key in the schema for Post if you want to display whether or not a post has been edited in the past
    - TODO: probably not worth the trouble of messing with the schema

- Delete

  - We don't want to store unnecessary data after deleting the post
    - DONE: removed from db and feed
  - Deletion should prompt the user for confirmation
    - TODO: endpoint is ready, just needs this logic

- React Component for Post

  - The post page should display the post's title, body, date of creation, and image (if you have added this feature)
    - DONE: postPage
  - Later, you will display comments underneath the post

- API Endpoints

  - Updating post by id using new values
    - DONE: /api/posts/update => updatePost(id)
  - Delete post by id
    - DONE: /api/posts/delete => deletePost(id)

Acceptance Criteria:

- Update should only take 1 database call
- Deleting a post should also delete all the comments under it (it might be difficult to do this in 1 database query - perhaps try 2?)
  - We don't want to store unnecessary data after deleting the post
    - MOVED: Moved to Ticket 3

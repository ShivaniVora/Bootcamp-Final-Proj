## Posts - Create and read (from DB) posts

Context: Implement the ability to create new posts. Feel free to add this functionality any way you'd like, whether that be through a popup modal or through a navigation to another screen. Each post should be viewable through their own individual route.

What you need to implement:

- Create a new post

  - Should require the user to input at minimum a title (String) and a body (String)
    - DONE: in postCreator.js component
  - If you have time, you can also allow the user to optionally input a URL to an image (String)
    - DONE: in postCreator.js component (no URL verification)
  - Submitting these inputs should redirect the user to the post's individual page
    - DONE: in postCreator.js component routes to /posts/id for new post

- View posts

  - Each post should live independently on its own route
    - DONE: routed through /posts/id
  - This page should be server-side rendered
    - DONE 

- API endpoints
  - Get specific post details by id
    - DONE: /api/posts/id => findPost(id)
  - Post creation - you should be passing in all the relevant information into the
 request's body (POST!)
    - DONE: /api/posts/create => createPost(body)


Acceptance Criteria:

- All API endpoints should make exactly 1 request to the database
- Inputs for post title and body should have input validation (prevent empty submissions)

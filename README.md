**Social Network**

This repository contains the implementation of a social network using Django, Python, JavaScript, HTML, and CSS. The network application allows users to make posts, follow other users, and interact with posts by liking them. Below is a guide to understanding the structure of the project and its functionality.

### Demo Video

A demo video showcasing the functionality of the social network application can be found [here](https://youtu.be/b-GK5WOyRqs).


### Project Structure

- **django-social-network-app** This directory contains the Django project named "project4."
    - **network**: Django app for the social network.
        - **migrations**: Directory for database migrations.
        - **templates/network**: HTML templates for the application.
        - **static/network**: Static files such as JavaScript and CSS.
        - **urls.py**: URL configuration for the app.
        - **views.py**: Views associated with each route.
        - **models.py**: Definition of database models.
        - **forms.py**: Forms for user interaction.

### Running the Application

1. Clone the repository to your local machine.
2. Navigate to the `django-social-network-app` directory.
3. Run `python manage.py runserver` to start the Django web server.
4. Visit the website in your browser to access the application.

### Functionality Overview

- **New Post**: Users can create new text-based posts by filling in text into a text area and submitting the post.
- **All Posts**: The "All Posts" page displays all posts from all users, with the most recent posts first. Each post includes the username of the poster, post content, post timestamp, and the number of likes.
- **Profile Page**: Clicking on a username loads the user's profile page, displaying the number of followers and following users, along with all posts in reverse chronological order. Users can follow or unfollow other users from this page.
- **Following**: The "Following" page displays posts made by users that the current user follows. Similar to the "All Posts" page but with a limited set of posts.
- **Pagination**: Posts are paginated, with 10 posts per page. Pagination links allow users to navigate between pages.
- **Edit Post**: Users can edit their own posts by clicking an "Edit" button/link on the post. Post content is replaced with a textarea for editing, and changes are saved asynchronously without reloading the entire page.
- **Like and Unlike**: Users can toggle whether they like a post. Like counts are updated asynchronously without page reload.

### Additional Notes

- Modifications to the `network/models.py` file are necessary for defining models and database interactions.
- Bootstrap's Pagination features can be utilized for displaying pagination links in HTML.
- JavaScript's `fetch` function is used for asynchronous communication with the server for actions like editing posts and updating likes.

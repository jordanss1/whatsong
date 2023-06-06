<h1><b>WhatSong - A Spotify Search Engine</b></h1>

[Live URL](https://whatsong-rust.vercel.app)

<h3><b>Outline of Usage</b></h3>

A web application that makes use of the search endpoint of the Spotify API and gives the user the ability to search across two categories.

<h3><b>How to use app</b></h3>

Press get started and you will be taken to the main search box. Here you can choose to search for "Artists" or "Songs". 

After entering your search term and choosing your category you will be returned a list of artists or tracks. With artists you can click on the spotify icon and be taken to their Spotify page.

There is more functionality with tracks. After your search for tracks you can see more track detail by pressing the "Details" button and the sidebar will expand giving more track details.

Press the red "X" icon in the top right to remove the details from the sidebar. The "Listen" button will take you to the track on Spotify.

<h3><b>Quick Start</b></h3>

<ul>
<li>Open your terminal and git clone the repository:

    $ git clone https://github.com/jordanss1/spotify-clone

</li>

<li> Access the folder, "cd" into the directory and install any dependencies:

    $ npm install

</li>

<li> Then start the react application

    $ npm start

</li>
    
</ul>
    
<h4> <b>You will need to gain a client Id and client secret from the Spotify Developer dashboard. </b> </h4>
 
<ul>

<li> 
     Login to your spotify account and go to developer.spotify.com and go to "Dashboard"

</li>
    

<li> In the dashboard you will need to create an app and from there you will be able to access your client Id and secret

</li>
    

<li> Once inside your text editor you will need to add a .env file into the root directory and then add:
    REACT_APP_ID= [client-Id]
    REACT_APP_SECRET=[client-secret]
    into the .env file.
</li>

<li> Then, ctrl + C inside of your terminal to stop running the application and then npm start back into the application
</li>
    

</ul>

<h3><b>Technologies Used</b></h3>
<ul>
<li>ReactJS</li>
<li>JavaScript</li>
<li>TypeScript</li>
<li>React Testing Library</li>
<li>Jest</li>
<li>Mock Service Worker</li>
<li>HTML</li>
<li>CSS</li>
<li>React Router</li>
<li>BootStrap</li>
<li>Semantic UI</li>
<li>Axios</li>
<li>NPM</li>
</ul>

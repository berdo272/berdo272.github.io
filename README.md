# berdo272.github.io

~ABOUT WIP.js~

WIP (Work in Progress) is my attempt to create a game in HTML and JS that holds game state between sessions.

At it's core, WIP is powered by Jquery. It utilizes cookies, and HTML elements to maintain game flow. 
Originally I attempted to program the game using a while true game loop. 
It became increasingly complicated to save and load game state using cookies.

Presently the game loads a user cookie by the 'Player Name' entered in the text box. 
If game data exists it is loaded and populates the table, otherwise standard data is generated, but by defualt NOT SAVED for that name. 

The remainder of the game uses and modifies the table elements using their ID.

The state can be saved by pulling all table elements and building and/or overwriting the user cookie.

Flow control and *my best effort at preventing user error* is done with flow control functions that prevent access to control buttons that would have an adverse effect on gameplay. 

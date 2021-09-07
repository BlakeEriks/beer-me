
<p align="center"><img  src="./static/img/GoalFeedTitle.png"/>Created by Blake Eriks</p>

[Goal Feed](https://goal-feed.vercel.app/) is a web app that let's you check highlights on recent professional soccer (football) matches that you didn't get to watch.

Goal Feed is built using:
* HTML5
* CSS
* Javascript
* JQuery 3.3.1

### Usage

Super easy - If your match is in the most recent games, hover over the game to pull up the highlights. If you don't see the game you're looking for, go ahead and search for your team in the search bar to find it.

### Approach

This app uses a single API call to get a list of recent matches from [ScoreBat](https://www.scorebat.com). This list is then filtered based on what the user enters into the search field.

### Future Enhancements:

* API provides multiple video links sometimes - create sliding panel for these instances

* Highlighting on currently hovered match / show more button

* Animate added matches after clicking show more

* Remove show more button when end of list is reached.

* Nav bar at the top for finding games by tournaments / viewing standings in different leagues

* Media queries for mobile friendly usage
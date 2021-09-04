let matchData, matchList, leagueData;

let matchesShown = 5;

const init = () => {

    // $.ajax({
    //     url :'https://api-football-v1.p.rapidapi.com/v3/leagues',
    //     data : {'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    //             'x-rapidapi-key': '8b4645bb76mshefe90b7960b30c0p107a50jsn3bef4a0b86fd'}
    // }).then( data => {
    //     console.log(data);
    // }, error => {
    //     console.log(error);
    // })

    $.get('data.json').then( data => {
        matchData = preprocessMatchData(data.response);
        matchList = matchData.slice(0,5);
        renderMatches();
    });

    $.get('./static/leagues1.json').then( data => {
        leagueData = data;
    }).then( () => {
        //console.log(leagueData);
    });
}

const renderMatches = () => {
    matchList.forEach(match => {
        let $matchItem = $('<div>').addClass('matchItem').css('height', $(this).height);
        let $matchTitle = $('<div>').addClass('matchTitle');
        let $matchTitleDetails = $('<div>').addClass('matchTitleDetails');

        let $matchContent = $('<div>').addClass('matchContent');
        let $matchInnerContent = $('<div>').addClass('matchInnerContent');
        let $matchVideoTitle = $('<div>').addClass('matchVideoTitle').text(match.videos[0].title);
        let $matchVideo = $('<div>').addClass('matchVideo').append($(match.videos[0].embed));
        $matchInnerContent.append($matchVideoTitle);
        $matchInnerContent.append($matchVideo);
        $matchContent.append($matchInnerContent);

        $matchTitle.append($('<span>').addClass('matchTitleText').text(match.title));
        $matchTitleDetails.append($('<span>').addClass('matchTitleDetais').text(match.competition + ' - ' + formatDate(match.date)));

        $matchTitle.append($matchTitleDetails);
        
        $matchItem.append($matchTitle);
        $matchItem.append($matchContent);
        $matchList.append($matchItem);
    });

    let $showMore = $('<div>').addClass('showMoreButton').text('Show more...');
    $matchList.append($showMore);
}

const formatDate = date => {
    
    formattedDate = new Date(date);
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
    return month + '/' + day;
}

const $matchList = $('.matchList');
const $matchItem = $('.matchItem');
const $showMoreButton = $('.showMoreButton');

init();

function preprocessMatchData(matchData) {
    for (match of matchData) {
        match.title = match.title.replace('-', "vs");
        match.competition = match.competition.substring(match.competition.indexOf(' '));
    }
    return matchData;
}

// $.ajax({
//     url: `https://www.scorebat.com/video-api/v3/`
// }).then(
//     data => {
//         matchData = data;
//         console.log(matchData);
//     },
//     error => {
//         console.log(error);
//     }
// );
let matchData, matchList, leagueData;

const matchesShown = 5;

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
        let $matchContent = $('<div>').addClass('matchContent');//.hide();
        let $matchVideo = $("<div>").addClass('matchVideo').append($(match.videos[0].embed));

        $matchTitle.append($('<span>').addClass('matchTitleText').text(match.title));
        $matchTitleDetails.append($('<span>').addClass('matchCompetition').text(match.competition));
        $matchTitleDetails.append($('<span>').addClass('matchDate').text(new Date(match.date).toLocaleDateString()));
        $matchTitle.append($matchTitleDetails);
        
        $matchContent.append($matchVideo);
        $matchItem.append($matchTitle);
        $matchItem.append($matchContent);
        $matchList.append($matchItem);
    });
}

const $matchList = $('.matchList');
const $matchItem = $('.matchItem');

$matchItem.on('click', () => {
    console.log('clicked match: ' + this);
});

init();

function preprocessMatchData(matchData) {
    for (match of matchData) {
        let competitionArr = match.competition.split('');
        for (let i = 1; i < competitionArr.length; i++) {
            if (competitionArr[i] === ":") break;
            competitionArr[i] = competitionArr[i].toLowerCase();
        }
        match.competition = competitionArr.join('');
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
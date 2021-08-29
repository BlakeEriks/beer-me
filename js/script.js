let matchData, matchList, countryNameToFlagUrl;

$.get('countries.json').then( data => {
    countryNameToCode = data;
})

$.get('data.json').then( data => {
    matchData = data.response;
    matchList = matchData.slice(0,5);
    console.log(matchList);
    renderMatches();
});

const $matchList = $('.matchList');

const renderMatches = () => {
    matchList.forEach(match => {
        let matchDate = new Date(match.date);
        console.log(matchDate.toDateString());
        let $newMatch = $('<div>').addClass('matchItem');
        $newMatch.append($('<span>').addClass('matchTitle').text(match.title));
        $newMatch.append($('<span>').addClass('matchDate').text(new Date(match.date).toLocaleDateString()));
        console.log($newMatch);
        $matchList.append($newMatch);
    });
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
let completeMatchList, filteredMatchList, leagueData;

let matchesShown = 5;

const $matchList = $('.matchList');
const $matchItem = $('.matchItem');
const $searchInput = $('.searchInput');

const preprocessMatchData = matchData => {
    let htmlMatchList = [];
    for (match of matchData) {
        match.title = match.title.replace('-', "vs");
        if (match.competition.includes('CUP: Africa')) {
            match.competition = 'AWC: ' + match.competition.substring(19);
        }
        else {
            match.competition = match.competition.substring(match.competition.indexOf(' '));
        }
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
        htmlMatchList.push($matchItem);
    }
    return htmlMatchList;
}

const refreshCallbacks = () => {
    const $showMoreButton = $('.showMoreButton');
    $showMoreButton.on('click', () => {
        matchesShown = (matchesShown + 5 > filteredMatchList.length) ? filteredMatchList.length : matchesShown + 5;
        renderMatches();
    });
}

const renderMatches = () => {
    $matchList.empty();
    for(let i = 0; i < matchesShown; i++) {
        $matchList.append(filteredMatchList[i]);
    }
    let $showMore = $('<div>').addClass('showMoreButton').text('Show more...');
    if (matchesShown === filteredMatchList.length) $showMore.hide();
    $matchList.append($showMore);
    refreshCallbacks();
}

const init = () => {

    $.ajax({
        url: `https://www.scorebat.com/video-api/v3/`
    }).then(
        data => {
            completeMatchList = preprocessMatchData(data.response);
            filteredMatchList = completeMatchList;
            renderMatches();
        },
        error => {
            console.log(error);
        }
    );

    $searchInput.on('input', () => {
        let filter = $searchInput.val();
        filteredMatchList = completeMatchList.filter( match => match.children('.matchTitle')[0].outerText.includes(filter));
        matchesShown = filteredMatchList.length < 5 ? filteredMatchList.length : 5;
        renderMatches();
    });
}

const formatDate = date => {
    formattedDate = new Date(date);
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
    return month + '/' + day;
}

init();
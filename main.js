const Client_Id = "776003587884-efflfr23k2jio0te9tpr9ft99snbujm8.apps.googleusercontent.com";
const Api_Key = "AIzaSyA1-t99CLHEm5NquWnTrEDDrIc7eKpRhgU";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content');
const channelForm = document.getElementById('Channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');
const defaultChannel = 'techguyweb';
channelForm.addEventListener('submit',e=>{
	e.preventDefault();
	const channel = channelInput.value;
	getChannel(channel);
})
function handleClientLoad()
{
	gapi.load('client:auth2', function()
{
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: Client_Id,
		scope: SCOPES,
	}).then(()=>{
		    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); 
		    authorizeButton.onclick = handleAuthClick;
		    signoutButton.onclick = handleSignoutClick;
	})
});
}

function updateSigninStatus(isSignedIn)
{
	if(isSignedIn)
	{
		authorizeButton.style.display='none';
		signoutButton.style.display='block';
		content.style.display='block';
		videoContainer.style.display='block';
	    getChannel(defaultChannel);
	}
	else
	{
		authorizeButton.style.display='block';
		signoutButton.style.display='none';
		videoContainer.style.display='none';
		content.style.display='none';
	}	
} 

function handleAuthClick()
{
	gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick()
{
	gapi.auth2.getAuthInstance().signOut();
}
function showChannelData(data)
{
    const channelData = document.getElementById('Channel-data');
    channelData.innerHTML=data;
}
function getChannel(Channel)
{
	gapi.client.youtube.channels
	.list({
		part: 'snippet,contentDetails,statistics',
		forUsername: Channel
	})
	.then(response=>{
		console.log(response);
		const channel = response.result.items[0];

		const output = `
		   <ul class="collection">
		     <li class="collection-items">TITLE: ${channel.snippet.title}</li>
		     <li class="collection-items">ID: ${numberWithCommas(channel.id)}</li>
		     <li class="collection-items">SUBSCRIBERCOUNT: ${numberWithCommas(channel.statistics.subscriberCount)}</li>
		     <li class="collection-items">VIEWCOUNT: ${numberWithCommas(channel.statistics.viewCount)}</li>
		     <li class="collection-items">VIDEOCOUNT: ${numberWithCommas(channel.statistics.videoCount)}</li>
		    </ul>
		    <p>${channel.snippet.description}</p>
		    <hr>
		    <a class="btn grey darken-2 target="_blank" href="https://youtube.com/${channel.snippet.customUrl}">Visit Channel</a>
		    `;
		    showChannelData(output);
		    const playlistID = channel.contentDetails.relatedPlaylists.uploads;
	         requestVideoPlaylist(playlistID);
	})
	.catch(err=> alert('No Channel By That Name'));
}

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}
function requestVideoPlaylist(playlistID)
{  
	const requestOptions = {
        playlistid : playlistID,
        part: 'snippet',
        maxResults: 1
    };
 const request = gapi.client.youtube.playlistItems.list(requestOptions);
   request.execute(response=>
   {
   	console.log(response);
   });
}
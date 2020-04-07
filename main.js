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
		authorizeButton.style.display='block';
		signoutButton.style.display='none';
		content.style.display='block';
		videoContainer.style.display='block';
		getChannel(defaultChannel);
	}
	else
	{
		authorizeButton.style.display='none';
		signoutButton.style.display='block';
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


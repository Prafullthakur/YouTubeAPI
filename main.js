const Client_Id = "776003587884-l6e3teijivq9qavcrhcu9nr4pekv4iit.apps.googleusercontent.com";
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
	gapi.load('client:auth2', initClient);
}
function initClient()
{
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: Client_Id,
		scope: SCOPES,
	}).then(()=>{
		 // updateSigninStatus(gapiAuthIntanse().isSignedIn.get());
		 // authorizeButton.onclick = handleAuthClick;
		 // signoutButton.onclick = handleSignoutClick;
	})
}

/*function updateSigninStatus(isSignedIn)
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

function getChannel(channel)
{
console.log(channel);
}*/
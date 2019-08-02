const data = [
	{
		name: "Messagerie",
		status: "up",
		description: "lorem ipsum 1"
	},
	{
		name: "Intranet",
		status: "degraded",
		description: "lorem ipsum 2"
	},
	{
		name: "Sigato",
		status: "down",
		description: "lorem ipsum 3"
	},
]
//voir pour rajouter un id dans le service pour la selection et eviter d'avoir 2 services avec le même nom

const statusImage = status => status === 'up' ? '../assets/sun.svg' : status === 'degraded' ? '../assets/cloud.svg' : '../assets/thunder.svg'

const showServiceInfo = name => {
	$(`#${name}`).addClass("movetxt")
	$('#service-details').attr("displayed", "true");
	//setTimeout(() => { return $('#service-details').attr("displayed", "false")},2000);
}

const serviceItem = ({name, status}) => (`
	<div class="service service-status-${status}" onclick="showServiceInfo('${name}')" id="${name}">
		<div class="service-item">
			<div class="pure-u">
				<img alt="service is ${status}" class="service-avatar" src="${statusImage(status)}" width="64" height="64">
			</div>
			<div class="pure-u-3-4">
				<h3 class="service-name" >${name}</h3>
			</div>
		</div>
	</div>
`)

const serviceListFromData = data => data.map(service => serviceItem(service));

const f = () => {
	const serviceItems = serviceListFromData(data).join('');
	$('#service-list').html(serviceItems);
}
f();
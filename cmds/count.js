const ytdl = require('ytdl-core')

module.exports.run = async(bot, message, args) =>{

	const streamOptions = {seek: 0, volume: 1, passes: 5};
	let voiceChannelID = "479175865318637569";

	console.log("Starting voice command");

	if (voiceChannelID != null){
		if(message.guild.channels.cache.get(voiceChannelID)){
			let vc = message.guild.channels.cache.get(voiceChannelID);
			console.log("Next stop, connection");

			vc.join().then(connection => {
				console.log("[VOICE CHANNEL] joined countdown channel.");
				const stream = ytdl('https://www.youtube.com/watch?v=YV8MuXjCHLQ', { filter:'audioonly' }) ;
				
				const dispatcher = connection.play(stream, streamOptions);
				// console.log('fault-------------------');
				dispatcher.on("end", end =>{
					console.log("[VOICE CHANNEL] left countdown channel.");
					vc.leave();

				})
			}).catch(err =>{
				console.log(err);
			});

		}
	}
}

module.exports.help = {
	name : "c"
}

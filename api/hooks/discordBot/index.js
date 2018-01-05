const Commando = require('discord.js-commando');
const path = require('path');

/**
 * @module DiscordBot
 * @description a Sails project hook. Integrates a discord bot to the system
 * @param {*} sails Global sails instance
 */

 /**
  * @module DiscordCommands
  * @description Command guide for users
  */

module.exports = function discordBot(sails) {
  return {

    /**
     * @memberof module:DiscordBot
     * @method
     * @name initialize
     * @description Starts the discord bot & logs in
     */
    initialize: function (cb) {
      sails.on('hook:orm:loaded', function () {
        sails.log.debug('HOOK: Initializing discord bot')
        const client = new Commando.Client({
          owner: sails.config.custom.botOwners 
        });

        client.customEmbed = require('./util/createEmbed');

        client.registry
          .registerGroups([
            ['7dtd', '7 Days to die']
          ])
          .registerDefaults()
          .registerCommandsIn(path.join(__dirname, 'commands'));

          client.login(sails.config.custom.botToken).then(() => {
              sails.log.debug("Bot successfully logged in!")
              return cb();
          })
          .catch((err) => {
              sails.log.error(err)
          })

      });
    },
  };
}
const Discord = require("discord.js")
const rootdir = process.cwd()
const { join } = require("path")
const { QuickDB } = require("quick.db")

const db = {
    keys: new QuickDB({ table: "keys", filePath: join(rootdir, "database/sqlite/keys.sqlite")})
}

module.exports = {
    name: "redeemkey",
    description: "Resgate uma chave para um cargo",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "key",
            description: "Coloque sua key aqui",
            required: true,
            type: Discord.ApplicationCommandOptionType.String,
        }
    ],

    run: async(interaction, client) => {
        const key = interaction.options.getString("key")

        if (!await db.keys.has(`${key}`)) return interaction.reply({ content: `A key \`${key}\` não foi encontrada! Tente novamente!`, ephemeral: true })
        interaction.member.roles.add(await db.keys.get(`${key}`))

        interaction.reply(`Sucesso, você resgatou a key!`)
        await db.keys.delete(`${key}`)

    }
}
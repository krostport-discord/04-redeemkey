const Discord = require("discord.js")
const rootdir = process.cwd()
const { join } = require("path")
const { QuickDB } = require("quick.db")
const config = require("../../config.json")

const db = {
    keys: new QuickDB({ table: "keys", filePath: join(rootdir, "database/sqlite/keys.sqlite")})
}

module.exports = {
    name: "genkey",
    description: "Crie uma chave com um cargo",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "role",
            description: "Coloque o cargo",
            required: true,
            type: Discord.ApplicationCommandOptionType.Role,
        }
    ],

    run: async(interaction, client) => {
        const role = interaction.options.getRole("role")

        function key(tamanho) {
            var stringAleatoria = `${config.key_prefix}`;
            var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < tamanho; i++) {
                stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            return stringAleatoria;
        }

        const keyX = key(9)

        if(!interaction.member.permissions.has("8")) return interaction.reply({ content: ":x: Você não tem permissão!", ephemeral: true })
       await db.keys.set(`${keyX}`, role.id)

       interaction.reply({ content: `Criado com sucesso: \`${keyX}\``, ephemeral: true })
    }
}
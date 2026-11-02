# Discord Game Presence

An unofficial Discord Desktop userscript that displays game activity through a small, draggable overlay.

Made by **@Zwuiix**.

## Important notice

This project is for education, research, and experimentation only.

It interacts with undocumented Discord Desktop modules and internal endpoints. It is not an official Discord feature or API and may violate Discord's Terms of Service. Discord can remove the activity, change its internal modules, restrict the account, or take other action at any time.

There is no guarantee that the script is safe, undetectable, compatible with every Discord version, or able to unlock any badge or account progression. Use it only on an account and installation where you accept those risks. The project is provided as-is, without warranties.

## Features

- Discord Desktop support only.
- A compact dark-purple overlay isolated inside a Shadow DOM.
- One batch mode: **Playtime & Games**, which credits playtime for several games at once.
- Games are fetched at runtime from Discord's public detectable-games endpoint:
  https://cdn.discordapp.com/detectables/games.json
- No embedded game catalogue is required.
- Real batch progress slider showing completed games.
- Draggable header and draggable minimized button with corner snapping.
- Settings are saved locally between runs.
- The interface follows Discord's configured language when available, with English as the fallback.

## Requirements

- Discord Desktop, not Discord Web.
- Access to the Discord Developer Tools console.
- A Discord version exposing the internal Webpack modules used by the script.
- Network access to Discord's CDN and internal endpoints.

Discord can change these undocumented internals without notice. Compatibility with modified clients, Vencord, Flatpak, Snap, and future Discord updates is not guaranteed.

## Enable the Discord Desktop console

The script must be executed in the **Developer Tools console of the Discord Desktop application**. Do not use:

- Chrome, Edge, or Firefox's normal browser console;
- Discord Web;
- the console of a Discord website tab.

Those environments do not expose the internal Desktop modules required by the script.

### 1. Close Discord completely

Quit Discord from the system tray before editing its settings file. If Discord is still running, it can overwrite your changes when it closes.

It is a good idea to make a backup copy of the settings file before editing it.

### 2. Open Discord's settings.json

Use the path matching the Discord build you actually use:

| Platform | Stable | PTB | Canary |
| --- | --- | --- | --- |
| Windows | %APPDATA%\discord\settings.json | %APPDATA%\discordptb\settings.json | %APPDATA%\discordcanary\settings.json |
| macOS | ~/Library/Application Support/discord/settings.json | ~/Library/Application Support/discordptb/settings.json | ~/Library/Application Support/discordcanary/settings.json |
| Linux | ~/.config/discord/settings.json | ~/.config/discordptb/settings.json | ~/.config/discordcanary/settings.json |

On Windows, press **Win + R** and enter:

~~~text
%APPDATA%\discord\settings.json
~~~

If Windows asks which application should open the file, use Notepad or another plain-text editor. Do not use Word or a rich-text editor.

### 3. Enable Chromium DevTools

Add this property at the root of settings.json:

~~~json
{
  "DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true
}
~~~

If the file already contains settings, keep the existing properties and add a comma before the new property. For example:

~~~json
{
  "IS_MAXIMIZED": false,
  "DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true
}
~~~

The long property name is intentional. It is Discord's explicit warning that enabling Chromium DevTools exposes a powerful inspection and execution console inside the client. This is not the normal **Developer Mode** switch in Discord's user settings; it enables the actual Desktop application's DevTools.

Save the file, then start Discord again. If DevTools still does not open, quit every Discord process and launch the same Discord build whose settings file you edited.

### 4. Open the Desktop console

With Discord Desktop focused, use:

- **Windows/Linux:** Ctrl + Shift + I
- **macOS:** Command + Option + I

Select the **Console** tab. You should see a console belonging to the Discord Desktop application, not a browser tab.

### 5. Understand the “Allow pasting” warning

Chromium may block pasting into the console and show a self-XSS warning. This is a safety feature because pasting unknown code into a privileged console can expose your Discord account or let someone modify the client.

If you have reviewed the source and understand what you are running:

1. Click inside the Discord console.
2. Type **allow pasting** manually with your keyboard.
3. Press Enter.
4. Paste the complete contents of game-presence.js.
5. Press Enter to execute it.

Do not paste the words **allow pasting** from another application; the point of the warning is to make sure you intentionally acknowledge it. This command only unlocks pasting for the console and does not make the script safe by itself.

To disable Desktop DevTools later, close Discord and remove the property or change its value to false, then restart Discord.

## Quick start

1. Complete the **Enable the Discord Desktop console** steps above.
2. In the **Discord Desktop Console**, use the quick command below, or copy and execute the complete file.
3. Choose **Playtime & Games** in the overlay.

### Quick command from GitHub

After typing **allow pasting** manually in the console, paste this one-line command:

~~~js
fetch("https://raw.githubusercontent.com/Zwuiix-cmd/discord-game-badge-presence/main/game-presence.js").then(r=>r.text()).then(eval)
~~~

It downloads and executes the current `main` version of `game-presence.js` from GitHub. Review the source before using this command, since it executes remote code inside Discord Desktop. If your local changes are not pushed to GitHub, paste the complete contents of [game-presence.js](./game-presence.js) instead.

The script stops with a centered warning when it is executed in a normal browser. Run only one instance at a time.

To stop the active instance manually:

~~~js
window.__gamePresence.stop()
~~~

## Playtime & Games

Playtime & Games is the batch mode.

Default values:

- **Total hours:** 6000
- **Games:** 250
- **Per request:** 25
- **Delay between requests:** 450 ms
- **Rate-limit retry:** 5 s minimum

The progress slider advances as each game is processed. The button can be clicked again to stop the current batch. Completed sessions are sent through Discord's own analytics flow; this does not guarantee badge progression.

## Kodiak guild tag

At startup, the script checks whether the account is already in the Kodiak server. If not, it accepts the configured Kodiak invite and waits for Discord to synchronize membership. It then requests Kodiak as the account's displayed guild tag through Discord's internal `/users/@me/clan` route.

This cannot bypass Discord's eligibility rules: if Kodiak does not expose an active guild tag for the account, Discord can reject the request and the script stops with the returned error.

## How it works

The script:

1. Loads and validates Discord's detectable-game list.
2. Resolves Discord's REST client and analytics token from the running Desktop client.
3. Resolves the configured Discord locale for the interface.
4. Creates the isolated overlay and waits for the `Playtime & Games` selection.
5. Builds launch and heartbeat events for each selected game.
6. Sends those events to Discord's `/science` endpoint in batches, with retry handling for token expiry and rate limits.

The script does not launch games, modify Steam playtime, read passwords, or send project telemetry to an external service.

## Privacy

The script uses Discord's own client context and endpoints. The game list is fetched from Discord's CDN. Playtime & Games uses Discord's analytics endpoint for the requested session events.

The source does not intentionally collect or transmit raw tokens, passwords, or unrelated account data. Always inspect the source before executing code inside a privileged application console.

## Troubleshooting

### The Desktop warning appears

The script was executed in a browser or in a client that does not expose Discord's required Desktop modules. Execute it from Discord Desktop's Developer Tools.

### The game list cannot be loaded

Check that Discord's CDN is reachable and that the console does not show a network or response-format error. Discord may also have changed the detectable-games endpoint.

### Batch claim failed

Check that the Discord session is still valid and that the client can reach `/users/@me?with_analytics_token=true` and `/science`. The script refreshes the analytics token once after a 401/403 response and retries rate limits, but it cannot repair an expired or restricted Discord session.



## License and trademarks

This project is independent and is not affiliated with, endorsed by, or sponsored by Discord, Kodiak, Valve, Steam, Vencord, or any game publisher. Discord and all game names, icons, and logos are trademarks of their respective owners.

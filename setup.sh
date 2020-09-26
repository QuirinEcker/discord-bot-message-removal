mkdir config

echo "Discord Token: "
read token

tokenConfig='
{
  "token": "@",
  "maintainer": "204674824910405633"
}
'

echo "${tokenConfig/@/$token}" > config/config.json

echo "Please fill out the ServerConfigs"

echo '
{
  "<sever id (right click on the server > copy id)> (With , you can even add another server to the list)": {
    "botChannelID": "<channel id for the bot commands and messages (right click on the channel > copy id)>",
    "botWhiteList": [
      "<Bot ids for bots immune to the filter (right click bot > copy id)>"
    ],
    "bots": [
      {
        "name" : "<name of the bot (optional)>",
        "id": "<Your bots on the server (ids) (right click bot > copy id)>",
        "prefix": "<prefix of the bot>"
      }
    ]
  }
}
' > config/ServerConfigs.json



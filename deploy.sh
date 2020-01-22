#!/bin/zsh

mkdir config
cd ./config || exit
touch config.json
touch filterConf.json

echo '
{
  "token": "musterToken"
}
' > config.json

echo '
{
  "botChannelID": "musterChannelID",
  "bots": [
    {
      "name": "musterBot",
      "id": "musterBotID",
      "prefix": "musterBotPrefix"
    }
  ]
}
' > filterConf.json


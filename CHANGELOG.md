# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit
guidelines.

## 0.1.0 (2021-12-05)

### Features

-  added \_assert specs & jest, eslint & prettier as dev dependencies
   ([109b02a](https://github.com/matthieu-locussol/MachuBot/commit/109b02ac7eb6b0a32db73cfe9290c9cbe934694f))
-  added \*.log files to .gitignore
   ([db4a153](https://github.com/matthieu-locussol/MachuBot/commit/db4a1531d36d6d521a5e6466cdec24598a0910bf))
-  added a chart utility file using chart.js
   ([9b51b6a](https://github.com/matthieu-locussol/MachuBot/commit/9b51b6aca2973a6213e31d2f3a2006571eabea7e))
-  added a crypto module
   ([97ac994](https://github.com/matthieu-locussol/MachuBot/commit/97ac994db4b934b3f0387fdf98a90cd8fed7e8b9))
-  added a financial chart to the crypto coin subcommand
   ([8d3f93a](https://github.com/matthieu-locussol/MachuBot/commit/8d3f93abc767f13870a3c3a06bb8ac1c2b05e00c))
-  added a getChartPoint utility function
   ([e826d66](https://github.com/matthieu-locussol/MachuBot/commit/e826d66e1d7d597c43c6aa6ae8db166a5320b49f))
-  added a Ping module
   ([4b0474a](https://github.com/matthieu-locussol/MachuBot/commit/4b0474a70210e2cdd53d1135caaae1316de0343d))
-  added a sample module, button & select components & updated Bot class architecture
   ([da18d28](https://github.com/matthieu-locussol/MachuBot/commit/da18d28e10f81040b1f87849a2473e75cc042adc))
-  added a start script
   ([eb99545](https://github.com/matthieu-locussol/MachuBot/commit/eb99545d2e1b072944ed0a2f5a601e0decb2ffbd))
-  added an emoji utility file & emojis assets
   ([27062b8](https://github.com/matthieu-locussol/MachuBot/commit/27062b83b8f498ed11a8f9916e501470a72b9d71))
-  added Discord.js & production token
   ([ea1cfb1](https://github.com/matthieu-locussol/MachuBot/commit/ea1cfb189d29b9f1c74262d3aae23564704ba707))
-  added eslint & prettier configurations
   ([43331ca](https://github.com/matthieu-locussol/MachuBot/commit/43331caa33bae2f61fc8597fcf800e5a9c2264eb))
-  added pm2 configuration file
   ([8559a08](https://github.com/matthieu-locussol/MachuBot/commit/8559a088fd2e02a902c9848ccb7f6eba05bb1037))
-  added some utility functions & their tests
   ([ad1fef2](https://github.com/matthieu-locussol/MachuBot/commit/ad1fef20274b536a3ab89e1594f678e783f85d02))
-  added support for context menu message & user commands
   ([3ded7f1](https://github.com/matthieu-locussol/MachuBot/commit/3ded7f1768059d46779489851ce7ae39e6037322))
-  added TypeScript & updated CI
   ([7823b69](https://github.com/matthieu-locussol/MachuBot/commit/7823b695655e4f698aaa6331b2db6408da3e64bf))
-  attempt to improve github workflow
   ([d7f70c3](https://github.com/matthieu-locussol/MachuBot/commit/d7f70c34def0a7f0155715f6cc8ee089089418a3))
-  first attempt to deploy on EC2
   ([1706d07](https://github.com/matthieu-locussol/MachuBot/commit/1706d07fe9ac8d7dc7394979cd90e61f7395527b))
-  sample modules & its components are added only when the bot is in development mode
   ([183b937](https://github.com/matthieu-locussol/MachuBot/commit/183b937181aa1a42c77280e16c1c37a7e0224e86))
-  updated CI to upload pm2 configuration
   ([c2a5252](https://github.com/matthieu-locussol/MachuBot/commit/c2a5252450d9d995eebf667ce6606b47f3235b41))
-  updated error message when a crypto coin is not found
   ([e0b9946](https://github.com/matthieu-locussol/MachuBot/commit/e0b9946c44c11bca5eb8c6c7c43f6f215eb68f45))
-  uses winston as a logger instead of default console
   ([e133f7a](https://github.com/matthieu-locussol/MachuBot/commit/e133f7a6d948e7213718a2497e3e75ea6d144d29))

### Bug Fixes

-  attempt to fix CI
   ([4dca8ca](https://github.com/matthieu-locussol/MachuBot/commit/4dca8ca6718c71700d7d3375695a066cd422c29a))
-  attempt to fix CI
   ([0707aba](https://github.com/matthieu-locussol/MachuBot/commit/0707aba815da9823a3f12287ef08964d10b3cfcc))
-  attempt to fix CI
   ([dff0e71](https://github.com/matthieu-locussol/MachuBot/commit/dff0e714f1aef8842f6f666ca55a10e9ee6bd5ef))
-  attempt to fix CI
   ([86b8b90](https://github.com/matthieu-locussol/MachuBot/commit/86b8b90c43fe91e0aa7322d5dc130e0f20540b17))
-  exported DISCORD_EMOJIS_SERVER_ID environment variable in the github workflow
   ([6fa4bfe](https://github.com/matthieu-locussol/MachuBot/commit/6fa4bfeaea1193dd6ec274d5c809d433a4d6b355))
-  module is set to CommonJS to allow import in files
   ([be0a82e](https://github.com/matthieu-locussol/MachuBot/commit/be0a82e9139fffbba77d2410f64ab0164da3028a))
-  rsync is not verbose anymore
   ([8ee46fe](https://github.com/matthieu-locussol/MachuBot/commit/8ee46fe86855ec4fdd8687a4dd5b589b8c145174))
-  updated github workflow & reordered imports in main file
   ([8be66fa](https://github.com/matthieu-locussol/MachuBot/commit/8be66fa24338e4d298903da5e37972d999903451))
-  updated initializeDevelopment method
   ([546915a](https://github.com/matthieu-locussol/MachuBot/commit/546915a6671a08ea2bf03919223fd706b2786f97))
-  updated pm2 configuration
   ([58fbe32](https://github.com/matthieu-locussol/MachuBot/commit/58fbe32bedceed70a3fbd3d1c1bbdc0d808ce814))
-  workflow will always install dependencies without using cache when deploying on server
   ([487cc64](https://github.com/matthieu-locussol/MachuBot/commit/487cc64a049e0da8f8fd7e24a8597a2ce57c4710))
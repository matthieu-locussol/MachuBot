import type { GuildEmoji, GuildManager } from 'discord.js';
import { DateTime, Settings } from 'luxon';
import { getEmoji } from '../../../utils/emoji';
import type { OsuPP, UserBest } from './api';
import {
   bestScoreNameFormatter,
   bestScoreValueFormatter,
   formatApprovalDate,
   recentAuthorFormatter,
   recentDescriptionFormatter,
   recentDetailsFormatter,
   recentFooterFormatter,
   recentMapInformationsFormatter,
   recentScoreFormatter,
   recentTitleFormatter,
} from './formatters';

describe(__filename, () => {
   process.env.DISCORD_EMOJIS_SERVER_ID = 'emojiServerId';

   const mockedGuildManager = {
      cache: [
         {
            id: 'emojiServerId',
            emojis: {
               cache: [
                  {
                     name: 'RankA',
                     toString: () => 'RankA',
                  },
               ],
            },
         },
      ],
   } as unknown as GuildManager;

   test('recentAuthorFormatter', () => {
      const samples: [string, string, string, string, string, string][] = [
         ['', '', '', '', '', ': pp | WR • # |  • #'],
         [
            'Player',
            '4,236.77',
            '77,475',
            'FR',
            '2,287',
            'Player: 4,236.77pp | WR • #77,475 | FR • #2,287',
         ],
      ];

      for (const [player, ppUser, worldRank, country, countryRank, output] of samples) {
         expect(recentAuthorFormatter(player, ppUser, worldRank, country, countryRank)).toEqual(
            output,
         );
      }
   });

   test('recentTitleFormatter', () => {
      const samples: [string, string, string, string][] = [
         ['', '', '', ' -  []'],
         ['Sotarks', 'Some map', 'Some difficulty', 'Sotarks - Some map [Some difficulty]'],
      ];

      for (const [artist, title, difficulty, output] of samples) {
         expect(recentTitleFormatter(artist, title, difficulty)).toEqual(output);
      }
   });

   test('recentDescriptionFormatter', () => {
      const samples: [number | null, number | null, string][] = [
         [null, null, ''],
         [1, null, '***Personal record #1***'],
         [null, 2, '***World record #2***'],
         [3, 4, '***World record #4*** • ***Personal record #3***'],
      ];

      for (const [bestIndex, worldIndex, output] of samples) {
         expect(recentDescriptionFormatter(bestIndex, worldIndex)).toEqual(output);
      }
   });

   test('recentScoreFormatter', () => {
      const expectedNow = DateTime.fromISO('2021-10-20T23:09:00+00:00');
      Settings.now = () => expectedNow.toMillis();

      const samples: [GuildEmoji, string[], number, string, string, string | undefined, string][] =
         [
            [getEmoji(mockedGuildManager, 'RankA'), [], 0, '', '', undefined, 'RankA • 0 • % • '],
            [
               getEmoji(mockedGuildManager, 'RankA'),
               [],
               123456,
               '91.37',
               '2021-06-19T08:09:39+00:00',
               undefined,
               'RankA • 123,456 • 91.37% • 4 months ago',
            ],
            [
               getEmoji(mockedGuildManager, 'RankA'),
               [],
               123456,
               '91.37',
               '2021-06-19T08:09:39+00:00',
               '67.89',
               'RankA (67.89%) • 123,456 • 91.37% • 4 months ago',
            ],
            [
               getEmoji(mockedGuildManager, 'RankA'),
               ['HD', 'DT'],
               123456,
               '91.37',
               '2021-10-19T08:09:39+00:00',
               undefined,
               'RankA • +HDDT • 123,456 • 91.37% • 1 day ago',
            ],
            [
               getEmoji(mockedGuildManager, 'RankA'),
               ['HD', 'DT'],
               123456789,
               '91.37',
               '2021-10-20T08:09:39+00:00',
               '73.12',
               'RankA (73.12%) • +HDDT • 123,456,789 • 91.37% • 14 hours ago',
            ],
         ];

      for (const [emoji, mods, score, accuracy, date, progress, output] of samples) {
         expect(recentScoreFormatter(emoji, mods, score, accuracy, date, progress)).toEqual(output);
      }
   });

   test('recentDetailsFormatter', () => {
      const mockedStatistics = {
         count_50: 1,
         count_100: 16,
         count_300: 103,
         count_geki: 16,
         count_katu: 4,
         count_miss: 1,
      };

      const mockedPP: OsuPP = {
         pp: 1127,
         maxCombo: 437,
      } as OsuPP;

      const samples: [number, boolean, UserBest['statistics'], number | null, OsuPP, string][] = [
         [
            329,
            false,
            mockedStatistics,
            678,
            mockedPP,
            '**678pp →** 1,127pp if FC • **329x**/437x\n**103**x300 • **16**x100 • **1**x50 • **1**xMiss',
         ],
         [
            437,
            true,
            mockedStatistics,
            1120,
            mockedPP,
            '**1,120pp →** **FC** • **437x**/437x\n**103**x300 • **16**x100 • **1**x50 • **1**xMiss',
         ],
      ];

      for (const [combo, perfect, statistics, pp, ppInfos, output] of samples) {
         expect(recentDetailsFormatter(combo, perfect, statistics, pp, ppInfos)).toEqual(output);
      }
   });

   test('recentMapInformationsFormatter', () => {
      const samples: [number, string, string, string, string, number, string, string][] = [
         [
            127,
            '5',
            '6',
            '9',
            '10.3',
            222,
            '5.98',

            '02:07 • CS**5** HP**6** OD**9** AR**10.3** • BPM**222** • **5.98** ★',
         ],
      ];

      for (const [length, cs, hp, od, ar, bpm, stars, output] of samples) {
         expect(recentMapInformationsFormatter(length, cs, hp, od, ar, bpm, stars)).toEqual(output);
      }
   });

   test('recentFooterFormatter', () => {
      const samples: [string, string, string, string][] = [
         ['', '', '', 'Mapped by  •  on '],
         ['Sotarks', 'ranked', 'Date', 'Mapped by Sotarks • Ranked on Date'],
      ];

      for (const [author, approval, date, output] of samples) {
         expect(recentFooterFormatter(author, approval, date)).toEqual(output);
      }
   });

   test('formatApprovalDate', () => {
      const samples: [string, string][] = [
         ['', 'Unknown'],
         ['2020-07-26', 'Jul 26, 2020'],
         ['2022-07-16T11:08:51.785Z', 'Jul 16, 2022'],
      ];

      for (const [input, output] of samples) {
         expect(formatApprovalDate(input)).toEqual(output);
      }
   });

   test('bestScoreNameFormatter', () => {
      const samples: [GuildEmoji, string[], string, string][] = [
         [getEmoji(mockedGuildManager, 'RankA'), [], '', 'RankA • '],
         [getEmoji(mockedGuildManager, 'RankA'), [], 'Map', 'RankA • Map'],
         [getEmoji(mockedGuildManager, 'RankA'), ['HD', 'DT'], 'Map', 'RankA • +HDDT • Map'],
      ];

      for (const [emoji, mods, title, output] of samples) {
         expect(bestScoreNameFormatter(emoji, mods, title)).toEqual(output);
      }
   });

   test('bestScoreValueFormatter', () => {
      const samples: [string, string, string, string, string, string][] = [
         ['', '', '', '', '', '**pp** • % • [[]]() • '],
         [
            '212.54',
            '99.12',
            'Extreme',
            'url',
            '1 year ago',
            '**212.54pp** • 99.12% • [[Extreme]](url) • 1 year ago',
         ],
      ];

      for (const [pp, accuracy, difficulty, url, date, output] of samples) {
         expect(bestScoreValueFormatter(pp, accuracy, difficulty, url, date)).toEqual(output);
      }
   });
});

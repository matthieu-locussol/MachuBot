import axios from 'axios';
import download from 'download';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { calculate, OsuData } from 'rosu-pp';
import { logger } from '../../../logger';
import { _assert } from '../../../utils/_assert';
import { getModsBits, Mod } from './mods';

const ENDPOINT_OAUTH = 'https://osu.ppy.sh/oauth/token';
const ENDPOINT_API_V2 = 'https://osu.ppy.sh/api/v2';

interface Token {
   token_type: string;
   expires_in: number;
   access_token: string;
   timestamp: number;
}

let token: Token | undefined;

const shouldRefreshToken = (): boolean => {
   if (token === undefined) {
      return true;
   }

   const currentTimestamp = new Date().getTime();
   const expireTimestamp = token.timestamp + token.expires_in * 1000;
   return expireTimestamp - currentTimestamp < 60 * 1000;
};

const refreshTokenIfNeeded = async (): Promise<void> => {
   if (shouldRefreshToken()) {
      logger.info('Refreshing osu! token...');

      const response = await axios.post<Token>(ENDPOINT_OAUTH, {
         client_id: process.env.OSU_OAUTH_CLIENT_ID,
         client_secret: process.env.OSU_OAUTH_CLIENT_SECRET,
         grant_type: 'client_credentials',
         scope: 'public',
      });

      const timestamp = new Date().getTime();

      token = {
         ...response.data,
         timestamp,
      };
   }
};

const generateAuthorizationHeaders = async () => {
   await refreshTokenIfNeeded();
   _assert(token);

   return {
      Authorization: `Bearer ${token.access_token}`,
   };
};

export interface User {
   avatar_url: string;
   country_code: string;
   default_group: string;
   id: number;
   is_active: boolean;
   is_bot: boolean;
   is_deleted: boolean;
   is_online: boolean;
   is_supporter: boolean;
   last_visit: string;
   pm_friends_only: boolean;
   profile_colour: string | null;
   username: string;
   cover_url: string;
   discord: string | null;
   has_supported: boolean;
   interests: string | null;
   join_date: string;
   kudosu: {
      total: number;
      available: number;
   };
   location: string | null;
   max_blocks: number;
   max_friends: number;
   occupation: string | null;
   playmode: string;
   playstyle: string[];
   post_count: number;
   profile_order: string[];
   title: string | null;
   title_url: string | null;
   twitter: string | null;
   website: string | null;
   country: {
      code: string;
      name: string;
   };
   cover: {
      custom_url: string | null;
      url: string;
      id: string;
   };
   account_history: string[];
   active_tournament_banner: string | null;
   badges: string[];
   beatmap_playcounts_count: number;
   comments_count: number;
   favourite_beatmapset_count: number;
   follower_count: number;
   graveyard_beatmapset_count: number;
   groups: string[];
   loved_beatmapset_count: number;
   mapping_follower_count: number;
   monthly_playcounts: {
      start_date: string;
      count: number;
   }[];
   page: {
      html: string;
      raw: string;
   };
   pending_beatmapset_count: number;
   previous_usernames: string[];
   ranked_beatmapset_count: number;
   replays_watched_counts: {
      start_date: string;
      count: number;
   }[];
   scores_best_count: number;
   scores_first_count: number;
   scores_recent_count: number;
   statistics: {
      level: {
         current: number;
         progress: number;
      };
      global_rank: number;
      pp: number;
      ranked_score: number;
      hit_accuracy: number;
      play_count: number;
      play_time: number;
      total_score: number;
      total_hits: number;
      maximum_combo: number;
      replays_watched_by_others: number;
      is_ranked: boolean;
      grade_counts: {
         ss: number;
         ssh: number;
         s: number;
         sh: number;
         a: number;
      };
      country_rank: number;
      rank: {
         country: number;
      };
   };
   support_level: number;
   user_achievements: {
      achieved_at: string;
      achievement_id: number;
   }[];
   rankHistory: {
      mode: string;
      data: number[];
   };
   rank_history: {
      mode: string;
      data: number[];
   };
   ranked_and_approved_beatmapset_count: number;
   unranked_beatmapset_count: number;
}

export const getUser = async (userIdResolvable: number | string): Promise<User> => {
   const headers = await generateAuthorizationHeaders();
   const response = await axios.get<User>(`${ENDPOINT_API_V2}/users/${userIdResolvable}`, {
      headers,
   });

   return response.data;
};

export interface UserRecent {
   id: number;
   user_id: number;
   accuracy: number;
   mods: string[];
   score: number;
   max_combo: number;
   passed: boolean;
   perfect: boolean;
   statistics: {
      count_50: number;
      count_100: number;
      count_300: number;
      count_geki: number;
      count_katu: number;
      count_miss: number;
   };
   rank: string;
   created_at: string;
   best_id: number | null;
   pp: number | null;
   mode: 'osu' | 'taiko' | 'catch' | 'mania';
   mode_int: number;
   replay: boolean;
   beatmap: {
      beatmapset_id: number;
      difficulty_rating: number;
      id: number;
      mode: 'osu' | 'taiko' | 'catch' | 'mania';
      status: string;
      total_length: number;
      user_id: number;
      version: string;
      accuracy: number;
      ar: number;
      bpm: number;
      convert: boolean;
      count_circles: number;
      count_sliders: number;
      count_spinners: number;
      cs: number;
      deleted_at: string | null;
      drain: number;
      hit_length: number;
      is_scoreable: boolean;
      last_updated: string;
      mode_int: number;
      passcount: number;
      playcount: number;
      ranked: number;
      url: string;
      checksum: string;
   };
   beatmapset: {
      artist: string;
      artist_unicode: string;
      covers: {
         cover: string;
         'cover@2x': string;
         card: string;
         'card@2x': string;
         list: string;
         'list@2x': string;
         slimcover: string;
         'slimcover@2x': string;
      };
      creator: string;
      favourite_count: number;
      hype: number | null;
      id: number;
      nsfw: boolean;
      play_count: number;
      preview_url: string;
      source: string;
      status: string;
      title: string;
      title_unicode: string;
      track_id: null;
      user_id: number;
      video: boolean;
   };
   user: {
      avatar_url: string;
      country_code: string;
      default_group: string;
      id: number;
      is_active: boolean;
      is_bot: boolean;
      is_deleted: boolean;
      is_online: boolean;
      is_supporter: boolean;
      last_visit: string;
      pm_friends_only: boolean;
      profile_colour: string | null;
      username: string;
   };
}

export const getUserRecent = async (
   userId: number,
   index: number,
): Promise<UserRecent | undefined> => {
   const headers = await generateAuthorizationHeaders();
   const response = await axios.get<UserRecent[]>(
      `${ENDPOINT_API_V2}/users/${userId}/scores/recent`,
      {
         headers,
         params: {
            limit: 1,
            offset: index - 1,
            include_fails: 1,
         },
      },
   );

   if (response.data.length === 0) {
      return undefined;
   }

   return response.data[0];
};

export interface Score {
   id: number;
   user_id: number;
   accuracy: number;
   mods: string[];
   score: number;
   max_combo: number;
   passed: boolean;
   perfect: boolean;
   statistics: {
      count_50: number;
      count_100: number;
      count_300: number;
      count_geki: number;
      count_katu: number;
      count_miss: number;
   };
   rank: string;
   created_at: string;
   best_id: number | null;
   pp: number;
   mode: 'osu' | 'taiko' | 'catch' | 'mania';
   mode_int: number;
   replay: boolean;
   beatmap: {
      beatmapset_id: number;
      difficulty_rating: number;
      id: number;
      mode: 'osu' | 'taiko' | 'catch' | 'mania';
      status: string;
      total_length: number;
      user_id: number;
      version: string;
      accuracy: number;
      ar: number;
      bpm: number;
      convert: boolean;
      count_circles: number;
      count_sliders: number;
      count_spinners: number;
      cs: number;
      deleted_at: string | null;
      drain: number;
      hit_length: number;
      is_scoreable: boolean;
      last_updated: string;
      mode_int: number;
      passcount: number;
      playcount: number;
      ranked: number;
      url: string;
      checksum: string;
      max_combo: number;
   };
   beatmapset: {
      artist: string;
      artist_unicode: string;
      covers: {
         cover: string;
         'cover@2x': string;
         card: string;
         'card@2x': string;
         list: string;
         'list@2x': string;
         slimcover: string;
         'slimcover@2x': string;
      };
      creator: string;
      favourite_count: number;
      hype: number | null;
      id: number;
      nsfw: boolean;
      play_count: number;
      preview_url: string;
      source: string;
      status: string;
      title: string;
      title_unicode: string;
      track_id: number | null;
      user_id: number;
      video: boolean;
   };
   rank_global: number;
   user: {
      avatar_url: string;
      country_code: string;
      default_group: string;
      id: number;
      is_active: boolean;
      is_bot: boolean;
      is_deleted: boolean;
      is_online: boolean;
      is_supporter: boolean;
      last_visit: string;
      pm_friends_only: boolean;
      profile_colour: string | null;
      username: string;
      country: {
         code: string;
         name: string;
      };
      cover: {
         custom_url: string | null;
         url: string;
         id: string;
      };
      groups: string[];
   };
}

export const getScore = async (mode: string, scoreId: number): Promise<Score> => {
   const headers = await generateAuthorizationHeaders();
   const response = await axios.get<Score>(`${ENDPOINT_API_V2}/scores/${mode}/${scoreId}`, {
      headers,
   });

   return response.data;
};

export interface UserBest extends UserRecent {
   weight: {
      percentage: number;
      pp: number;
   };
}

export const getUserBests = async (userId: number, count = 100): Promise<UserBest[]> => {
   const headers = await generateAuthorizationHeaders();
   const response = await axios.get<UserBest[]>(`${ENDPOINT_API_V2}/users/${userId}/scores/best`, {
      headers,
      params: {
         limit: count,
      },
   });

   return response.data;
};

export interface OsuPPPayload {
   beatmapId: number;
   accuracy?: number;
   combo?: number;
   mods: Mod[];
   goods?: number;
   mehs?: number;
   misses?: number;
}

export interface OsuPP {
   stars: number;
   pp: number;
   ar: number;
   cs: number;
   hp: number;
   od: number;
   bpm: number;
   mode: 0 | 1 | 2 | 3;
   ppAcc: number;
   ppAim: number;
   ppFlashlight: number;
   ppSpeed: number;
   aimStrain: number;
   speedStrain: number;
   flashlightRating: number;
   sliderFactor: number;
   clockRate: number;
   nCircles: number;
   nSliders: number;
   nSpinners: number;
   maxCombo: number;
}

export const downloadBeatmaps = async (beatmapsIds: number[]): Promise<void> => {
   const beatmapsPaths = beatmapsIds.map((id) => ({
      id,
      path: resolve(__dirname, `../cache/${id}.osu`),
   }));

   const beatmapUrls = beatmapsPaths
      .filter(({ path }) => !existsSync(path))
      .map((infos) => ({ ...infos, url: `https://osu.ppy.sh/osu/${infos.id}` }));

   await Promise.all(
      beatmapUrls.map(({ url, id }) =>
         download(url, resolve(__dirname, `../cache`), { filename: `${id}.osu` }),
      ),
   );
};

export const getOsuPP = async ({
   beatmapId,
   accuracy,
   combo,
   goods,
   mehs,
   misses,
   mods,
}: OsuPPPayload): Promise<OsuData[]> => {
   await downloadBeatmaps([beatmapId]);

   const results = calculate({
      path: resolve(__dirname, `../cache/${beatmapId}.osu`),
      params: [
         {
            mode: 0,
            acc: accuracy,
            combo: combo || 1500,
            n100: goods,
            n50: mehs,
            nMisses: misses,
            mods: getModsBits(mods),
         },
         {
            mode: 0,
            acc: accuracy,
            mods: getModsBits(mods),
         },
      ],
   }) as OsuData[];

   return results;
};

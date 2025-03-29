import { GITHUB_USER_INFO_API } from '../apis';
import { drive } from '../drive';
import { iServerData } from '../helpers';
import type { GithubUserInfoBody } from '../models';

export const iGithubUserInfo = () =>
  iServerData(drive<GithubUserInfoBody>(GITHUB_USER_INFO_API));

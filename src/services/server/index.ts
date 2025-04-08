import { USER_INFO_API } from '../apis';
import { drive } from '../drive';
import { iServerData } from '../helpers';
import type { GithubUserInfoBody } from '../models';

export const iUserInfo = () =>
  iServerData(drive<GithubUserInfoBody>(USER_INFO_API));

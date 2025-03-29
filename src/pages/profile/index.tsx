import { Fragment } from 'react';

import { useQuery } from '@tanstack/react-query';

import { GITHUB_USER_INFO_API, iGithubUserInfo } from '@/services';

const Profile: React.FC = () => {
  const { data } = useQuery({
    queryKey: [GITHUB_USER_INFO_API],
    queryFn: iGithubUserInfo,
    enabled: false,
  });

  return (
    <Fragment>
      {'aaa'}
      {data?.name}
    </Fragment>
  );
};

export default Profile;

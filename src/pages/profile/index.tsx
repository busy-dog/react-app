import { Fragment } from 'react';

import { useQuery } from '@tanstack/react-query';

import { iUserInfo, USER_INFO_API } from '@/services';

const Profile: React.FC = () => {
  const { data } = useQuery({
    queryKey: [USER_INFO_API],
    queryFn: iUserInfo,
  });

  return <Fragment>{data?.name}</Fragment>;
};

export default Profile;

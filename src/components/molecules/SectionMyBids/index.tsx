import {VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  HomeProjectsHeader,
  MyBidsRow,
  ProjectsToBidPlaceHolder,
} from '~/components';
import {ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {useGetMyBids} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';

function SectionMyBids({my = '16px'}: {my?: string | number}) {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const myBidsOptions = {
    projectFilter: ProjectFilter.NewestToOldest,
    where: {
      and: [
        {
          project: {
            projectStatus: {neq: ProjectStatus.Cancelled},
          },
        },
        {
          or: [
            {
              project: {
                projectStatus: {eq: ProjectStatus.Bidding},
              },
            },
            {
              isBidder: {eq: true},
            },
          ],
        },
      ],
    },
    location: [12, 12],
    projectOrderVms: [
      {projectStatus: ProjectStatus.InProgress, order: 1},
      {projectStatus: ProjectStatus.Bidding, order: 2},
      {projectStatus: ProjectStatus.Finished, order: 3},
      {projectStatus: ProjectStatus.Failed, order: 4},
    ],
    isMyBid: true,
    pageSize: 3,
  };

  const {isLoading: getMyBidsLoading, data: getMyBids} =
    useGetMyBids(myBidsOptions);

  const myBids = getMyBids?.pages ?? [];

  const seeAllMyBids = () => {
    navigate('MainTabs', {
      screen: 'ProjectsTab',
      params: {initialRoute: 0},
    });
  };

  if (getMyBidsLoading) {
    return <ProjectsToBidPlaceHolder />;
  }

  if (myBids?.length > 0) {
    return (
      <VStack my={my} space="16px">
        <HomeProjectsHeader
          title={t('projects.bids.myBids')}
          onPress={seeAllMyBids}
        />
        {myBids?.map((item: any, index: number) => {
          return (
            <VStack px="24px" key={item?.project?.id}>
              <MyBidsRow mb={index < myBids?.length - 1 ? 42 : 0} item={item} />
            </VStack>
          );
        })}
      </VStack>
    );
  }

  return null;
}

export default memo(SectionMyBids);

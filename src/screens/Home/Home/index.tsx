import React from 'react';
import images from '~/assets/images';
import {
  CustomContainer,
  SearchOnMapButton,
  SectionHomeProjects,
  SectionUserRow,
} from '~/components';
import {Colors} from '~/styles';

const HomeScreen = () => {
  return (
    <CustomContainer
      barStyle="dark-content"
      headerBackground={images.headerBackground}
      statusBarBackgroundColor={Colors.WHITE_F}>
      <SectionUserRow />
      <SectionHomeProjects />
      <SearchOnMapButton />
    </CustomContainer>
  );
};

export default HomeScreen;

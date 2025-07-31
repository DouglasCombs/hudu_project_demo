import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@gluestack-ui/themed';
import React, {memo} from 'react';
import {CustomLoading} from '~/components';
import {Colors} from '~/styles';

const ActionSheetContainer = ({
  isVisible,
  onClose,
  children,
  loading,
  closeOnTouchOutSide = true,
}: {
  isVisible: boolean;
  onClose: any;
  children: any;
  loading?: boolean;
  closeOnTouchOutSide?: boolean;
}) => {
  return (
    <Actionsheet
      closeOnOverlayClick={closeOnTouchOutSide}
      isOpen={isVisible}
      onClose={onClose}>
      <ActionsheetBackdrop backgroundColor={Colors.BLACK_TRANSPARENT_4} />
      <ActionsheetContent
        maxHeight={'90%'}
        borderTopStartRadius={12}
        borderTopEndRadius={12}
        bg={Colors.WHITE_F}
        px="$0"
        pb="$4">
        <ActionsheetDragIndicatorWrapper mb={'$6'}>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {loading && <CustomLoading />}
        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default memo(ActionSheetContainer);

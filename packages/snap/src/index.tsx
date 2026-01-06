import type {
  OnHomePageHandler,
  OnCronjobHandler,
  OnInstallHandler,
} from '@metamask/snaps-sdk';
// https://github.com/MetaMask/snaps/blob/main/packages/snaps-sdk/src/jsx/components/index.ts
import {
  Box,
  Heading,
  Text,
  Checkbox,
  Row,
  Divider,
} from '@metamask/snaps-sdk/jsx';

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: (
      <Box>
        <Heading>PEPE Unchained Notifications</Heading>
        <Divider />
        {/* <Text>Notifications</Text> */}
        <Row label="Important News">
          <Checkbox name="fooo" label="" checked={true} variant="toggle" />
        </Row>
        <Row label="Pumppad.gg">
          <Checkbox name="bar" label="" checked={false} variant="toggle" />
        </Row>
      </Box>
    ),
  };
};

// https://docs.metamask.io/snaps/reference/entry-points#oninstall
export const onInstall: OnInstallHandler = async ({}) => {
  return await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: 'Thanks for installing PEPU Unchained Snap. Stay notified here.',
      title: 'PEPE Unchained',
      content: <Text> </Text>,
      footerLink: {
        text: 'Visit PEPE Unchained',
        href: `https://pepeunchained.com/`,
      },
    },
  });
};

// https://docs.metamask.io/snaps/features/cron-jobs/#2-implement-a-cron-job-handler
export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const state = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  console.log('\n\n\nstate::', state);

  // https://docs.metamask.io/snaps/features/notifications/#expanded-view
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: 'helloooo',
      title: 'PEPE Unchained',
      content: <Text> </Text>,
      footerLink: {
        text: 'Read More',
        href: `https://pepeunchained.com/`,
      },
    },
  });

  // update state
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { hello: 'world' },
    },
  });
};

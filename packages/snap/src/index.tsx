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

interface Notification {
  type: 'NEWS' | 'PUMPPAD';
  title: string;
  message: string;
  href: string | '';
  timestamp: number;
}

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: (
      <Box>
        <Heading>Notifications</Heading>
        <Divider />
        {/* <Text>Notifications</Text> */}
        <Row label="News">
          <Checkbox name="fooo" label="" checked={true} variant="toggle" />
        </Row>
        <Row label="Pumppad.gg">
          <Checkbox name="bar" label="" checked={true} variant="toggle" />
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
        text: 'Visit Site',
        href: `https://pepeunchained.com/`,
      },
    },
  });
};

// https://docs.metamask.io/snaps/features/cron-jobs/#2-implement-a-cron-job-handler
export const onCronjob: OnCronjobHandler = async ({ request }) => {
  // get last state
  const state = (await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  })) as Notification | null;

  // get last notification
  const response = await fetch('https://pepusnap.xyz/api');
  const notification: Notification = await response.json();

  // if no state or new notification 
  if (!state || (notification.timestamp > state.timestamp && true)) {
    // https://docs.metamask.io/snaps/features/notifications/#expanded-view
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: notification.message,
        title: notification.title,
        content: <Text> </Text>,
        ...(notification.href && {
          footerLink: {
            text: 'Visit Site',
            href: notification.href,
          },
        }),
      },
    });

    // update state with new notification
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: notification as any, // fkit
      },
    });
  }
};

import type {
  OnHomePageHandler,
  OnCronjobHandler,
  OnInstallHandler,
  OnUserInputHandler,
} from '@metamask/snaps-sdk';
// https://github.com/MetaMask/snaps/blob/main/packages/snaps-sdk/src/jsx/components/index.ts
import {
  Container,
  Box,
  Heading,
  Text,
  Checkbox,
  Row,
  Divider,
} from '@metamask/snaps-sdk/jsx';

interface Notification {
  type: 'news' | 'pumppad';
  title: string;
  message: string;
  href: string;
  timestamp: number;
  news: boolean;
  pumppad: boolean;
}

// https://docs.metamask.io/snaps/reference/entry-points#oninstall
export const onInstall: OnInstallHandler = async ({}) => {
  // set initial state
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: {
        timestamp: Date.now(),
        news: true,
        pumppad: true,
      },
    },
  });
};

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: (
      <Container>
        <Box>
          <Heading>Notifications</Heading>
          <Divider />
          <Row label="News">
            <Checkbox name="news" label="" checked={true} variant="toggle" />
          </Row>
          <Row label="Pumppad.gg">
            <Checkbox name="pumppad" label="" checked={true} variant="toggle" />
          </Row>
        </Box>
      </Container>
    ),
  };
};

// https://docs.metamask.io/snaps/reference/entry-points#onuserinput
export const onUserInput: OnUserInputHandler = async ({ event }) => {
  if (event.type !== 'InputChangeEvent') return;
  // get state
  const state = (await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  })) as Notification | null;
  // update state
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: {
        ...state,
        [event.name]: event.value,
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
  const response = await fetch('https://auth.pepusnap.xyz/api/notify');
  const notification: Notification = await response.json();

  if (
    !state || // if no state
    !state.timestamp || // if no timestamp
    (notification.timestamp > state.timestamp && // if new notification
      state[notification.type] === true) // if checkbox is checked
  ) {
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
        newState: {
          ...state,
          timestamp: notification.timestamp,
        },
      },
    });
  }
};

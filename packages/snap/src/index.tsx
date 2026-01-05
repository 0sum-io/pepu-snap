import type { OnCronjobHandler, OnInstallHandler } from '@metamask/snaps-sdk';
import { Text } from '@metamask/snaps-sdk/jsx';

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
  if (Math.random() < 0.5) return;

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
      encrypted: false,
    },
  });
};

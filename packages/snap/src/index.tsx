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
  // https://github.com/MetaMask/snaps/blob/main/packages/examples/packages/network-access/src/index.ts#L25
  const response = await fetch(
    `https://metamask-snap-notifi.vercel.app/mezo`,
  ).then((res) => res.json());

  // https://docs.metamask.io/snaps/features/data-storage/#use-unencrypted-storage
  const state = (await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
      encrypted: false,
    },
  })) || { id: 1 };

  // if old state then return
  if (state.id === response.id) return;

  // https://docs.metamask.io/snaps/features/notifications/#expanded-view
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: response.text,
      title: 'Mezo',
      content: <Text> </Text>,
      footerLink: {
        text: 'Read More',
        href: `https://x.com/MezoNetwork/status/${response.id}`,
      },
    },
  });

  // update state
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: response,
      encrypted: false,
    },
  });
};

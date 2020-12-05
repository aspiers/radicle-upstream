// eslint-disable-next-line @typescript-eslint/triple-slash-reference,spaced-comment
/// <reference path="../../native/preload.d.ts" />
import * as ipcTypes from "../../native/ipc-types";

export type { ProxyError } from "../../native/ipc-types";

// FIXME(rudolfs)
// `true` if we are running unit tests with Jest.
// const isNodeTestEnv = Boolean(
//   globalThis.process && globalThis.process.env["NODE_ENV"] === "test"
// );

// FIXME(rudolfs)
// `true` if this code is run by the Cypress test driver.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isCypressTestEnv = Boolean((globalThis as any).cy);

export const getVersion = (): Promise<string> =>
  window.electron.ipcRenderer.invoke(ipcTypes.RendererMessage.GET_VERSION);

export const openPath = (path: string): Promise<void> =>
  window.electron.ipcRenderer.invoke(ipcTypes.RendererMessage.OPEN_PATH, path);

// Informs whether it's running in a development environment.
export const isDev = (): boolean => {
  // FIXME(rudolfs)
  // return window.electron.isDev;
  return true;
};

// Informs whether it's running in experimental mode, where
// features under construction are enabled and can thus be used.
// This option can only be enabled iff `isDev()` as we should only
// want to toggle it while in development mode.
export const isExperimental = (): boolean => {
  // FIXME(rudolfs)
  // return isDev() && window.electron.isExperimental;
  return isDev() && false;
};

// FIXME(rudolfs)
// Register a listener for the `ipcTypes.ProxyError` message.
export function listenProxyError(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  f: (proxyError: ipcTypes.ProxyError) => void
): void {
  // if (isNodeTestEnv || isCypressTestEnv) {
  //   return;
  // }
  // window.electron.ipcRenderer.on(
  //   "message",
  //   (_event: unknown, message: ipcTypes.MainMessage) => {
  //     if (message.kind === ipcTypes.MainMessageKind.PROXY_ERROR) {
  //       f(message.data);
  //     }
  //   }
  // );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

// Polyfill React 18 internals on React 19 for @react-three/fiber / react-reconciler compatibility
function patchReact(targetReact: any) {
  if (!targetReact) return;

  if (!targetReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
    const clientInternals =
      targetReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
      targetReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED ||
      {};

    const dispatcher = {
      get current() {
        return clientInternals.H || null;
      },
      set current(val: any) {
        clientInternals.H = val;
      },
    };

    const batchConfig = {
      get transition() {
        return clientInternals.T || null;
      },
      set transition(val: any) {
        clientInternals.T = val;
      },
    };

    const owner = {
      get current() {
        return clientInternals.A || null;
      },
      set current(val: any) {
        clientInternals.A = val;
      },
    };

    const secretInternals = {
      ReactCurrentDispatcher: dispatcher,
      ReactCurrentBatchConfig: batchConfig,
      ReactCurrentOwner: owner,
      ReactDebugCurrentFrame: {},
    };

    try {
      Object.defineProperty(
        targetReact,
        "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
        {
          configurable: true,
          enumerable: true,
          writable: true,
          value: secretInternals,
        },
      );
    } catch {
      targetReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = secretInternals;
    }
  }
}

patchReact(React);
if (typeof window !== "undefined") {
  patchReact((window as any).React);
}
if (typeof globalThis !== "undefined") {
  patchReact((globalThis as any).React);
}

export default React;

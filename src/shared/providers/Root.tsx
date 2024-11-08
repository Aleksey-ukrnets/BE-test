import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { ErrorBoundary } from "../../components/ErrorBoundary";
import { App } from "../../App";
import { publicUrl } from "../utils/publickUrl";

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider
        manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}
      >
        <App />
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
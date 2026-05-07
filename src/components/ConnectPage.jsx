import { useState } from "react";
import Logo from "./ui/Logo";
import QBIcon from "./ui/QBIcon";
import Spinner from "./ui/Spinner";
import { getConnectUrl } from "../apis/api";

export default function ConnectPage({ onConnect }) {
  const [loading, setLoading] = useState(false);

  function handleConnect() {
    setLoading(true);
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      getConnectUrl(),
      "QuickBooks Login",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    const timer = setInterval(() => {
  const stored = localStorage.getItem("qbo_realm_id");
  if (stored) {
    clearInterval(timer);
    setLoading(false);
    if (popup && !popup.closed) popup.close();
    onConnect(stored);
    return;
  }

  if (!popup || popup.closed) {
    clearInterval(timer);
    setLoading(false);
  }
}, 500);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full">
        {/* Branding */}
        <div className="mb-10">
          <Logo size="md" />
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mt-6">
            Ledger this is change for history again new code again
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-light">
            QuickBooks expense reporter new code 
          </p>
        </div>

        {/* Card */}
        <div className="border border-gray-100 rounded-xl p-8 bg-gray-50">
          <h2 className="text-base font-medium text-gray-800 mb-1">Welcome</h2>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Connect your QuickBooks account to view and export your rent expense
            transactions.
          </p>

          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-black text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Spinner className="text-white" />
                Connecting...
              </>
            ) : (
              <>
                <QBIcon />
                Connect to QuickBooks by yash
                from this line its done in dev-yash branch...
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-300 text-center mt-6">
          Your credentials are handled securely by Intuit
        </p>
      </div>
    </div>
  );
}
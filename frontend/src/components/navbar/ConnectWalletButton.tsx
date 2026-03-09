import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function ConnectWalletButton() {
  const { publicKey, disconnect } = useWallet();

  const handleClick = () => {
    // Trigger the WalletMultiButton click
    const walletButton = document.querySelector(
      ".wallet-adapter-button.wallet-adapter-button-trigger",
    );
    if (walletButton instanceof HTMLElement) walletButton.click();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div id="wallet_button" className="items-center h-full">
      {publicKey ? (
        <button
          onClick={handleDisconnect}
          className="space-x-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled inline-flex rounded-xs font-display items-center justify-center transition-all h-[32px] py-[8px] px-[12px] bg-[image:var(--color-primary-gradient)] text-text-gradient-button text-xs md:text-md whitespace-nowrap"
        >
          <img src="/favicon.png" alt="Wallet" className="w-4 h-4 mr-2" />
          <span>{publicKey.toBase58().substring(0, 6) + "..."}</span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="space-x-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled inline-flex rounded-sm font-display items-center justify-center transition-all h-[32px] py-[8px] px-[12px] bg-[image:var(--color-primary-gradient)] text-text-gradient-button text-xs md:text-md whitespace-nowrap"
        >
          <span>Connect</span>
        </button>
      )}
      <div className="hidden">
        <WalletMultiButton />
      </div>
    </div>
  );
}

export default ConnectWalletButton;

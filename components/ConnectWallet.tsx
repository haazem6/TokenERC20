import { ConnectKitButton } from "connectkit";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// Define the props interface for the ConnectWallet component
interface Props {
  variant: string;
  className: string | undefined;
}

// ConnectWallet component definition
export default function ConnectWallet({
  variant = "outline-primary",
  className,
}: Props) {

  return (
    <ConnectKitButton.Custom>
      {({
        isConnected,
        isConnecting,
        show,
        truncatedAddress,
        ensName,
      }) => {
        
        return (
          <Button
            onClick={show} // Trigger the wallet connection modal
            variant={variant} // Set the button variant based on the prop
            className={className} // Set additional CSS classes if provided
            disabled={isConnecting} // Disable the button while connecting
          >
            {isConnecting && (
              <Spinner size="sm" />
            )}
            {/* Display different content based on connection status */}
            {isConnected ? (
              ensName ?? truncatedAddress
            ) : (
              // If connecting, show nothing; otherwise, show "🦊 Connect Wallet"
              (isConnecting ? "" : "🦊 ") + "Connect Wallet"
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import {
  Avatar,
  List,
  Placeholder,
  Section,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";

const TonConnectBtn = () => (
  <div className={"w-full flex items-center justify-center"}>
    <TonConnectButton className="mt-4" />
  </div>
);

export const TONConnectPage = () => {
  const wallet = useTonWallet();

  if (!wallet) {
    return (
      <Placeholder
        header="TON Connect"
        description={
          <>
            <Text>
              To display the data related to the TON Connect, it is required to
              connect your wallet
            </Text>
            <TonConnectBtn />
          </>
        }
      />
    );
  }
  const {
    account: { address },
  } = wallet;
  return (
    <List>
      {"imageUrl" in wallet && (
        <>
          <Section>
            <Avatar
              src={wallet.imageUrl}
              alt="Provider logo"
              width={60}
              height={60}
            />
            <Title level="3">{wallet.name}</Title>
            <Title level="2">{address}</Title>
          </Section>
          <TonConnectBtn />
        </>
      )}
    </List>
  );
};

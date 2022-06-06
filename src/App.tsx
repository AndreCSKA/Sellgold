import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import IgnotModal from "./components/IgnotModal";
import BuyBlockModal from "./components/BuyBlockModal";
import MyIgnotsModal from "./components/MyIgnotsModal";
import BuyIgnotModal from "./components/BuyIgnotModal";
import Registration from "./components/Registration";
import "@fontsource/inter";
import { useState } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [myGB, setMyGB] = useState("Privets");
  const [isVisibleMyGB, setIsVisibleMyGB] = useState(false);
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState(0);
  const [status, setStatus] = useState("");
  const [isVisibleBuyGB, setIsVisibleBuyGB] = useState(false);
  const [isVisibleBuyBloc, setIsVisibleBuyBlock] = useState(false);
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} account={account} etherBalance={etherBalance} handleConnectWallet={handleConnectWallet}/>
        <AccountModal isOpen={isOpen} onClose={onClose} />
        { account 
        
            ? <Registration account={account} handleOpenModal={isVisible} setHandleOpenModal={setIsVisible} 
            handleOpenModalMyGB={isVisibleMyGB} setHandleOpenModalMyGB={setIsVisibleMyGB} MyGB={myGB} setHandlerMyGB={setMyGB} handleOpenModalBuyGB={setIsVisibleBuyGB}
           />
            :null
        }
        <IgnotModal isOpen={isVisible} onClose={setIsVisible} />
        <MyIgnotsModal isOpen={isVisibleMyGB} onClose={setIsVisibleMyGB} MyGB={myGB} />
        <BuyIgnotModal isOpen={isVisibleBuyGB} onClose={setIsVisibleBuyGB} MyGB={myGB} HandlerOpenBuyWindow={setIsVisibleBuyBlock} 
        HandlerSetNumberIgnot={setNumber} HandlerSetPriceIgnot={setPrice} HandlerSetAddressIgnot={setAddress} HandlerSetStatusIgnot={setStatus}/> 
        <BuyBlockModal  isOpen={isVisibleBuyBloc} onClose={setIsVisibleBuyBlock} numberBlock={number} priceBlock={price} addressBlock={address} statusBlock={status}/>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
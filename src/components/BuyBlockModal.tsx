import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    NumberInput,
    NumberInputField,
    Input,
  } from "@chakra-ui/react";
  import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
  import { useEthers } from "@usedapp/core";
  import Identicon from "./Identicon";
  import { useState } from "react";
  import { ethers } from "ethers";
  import { useRegStatus, useContractMethod } from "../hooks";

  type Props = {
    isOpen: any;
    onClose: any;
    numberBlock: any;
    priceBlock: any;
    addressBlock: any;
    statusBlock: any;
  };

  type Props1 = {
    ether:any; addr:any;
  }
  
  export default function BuyBlockModal({ isOpen, onClose, numberBlock, priceBlock, addressBlock, statusBlock }: Props) {
    const { account, deactivate } = useEthers();
    const [inputPrice, setInputPrice] = useState("");

    const { state, send: BuyIgnot } = useContractMethod("BuyIgnot");
    function handleDeactivateAccount() {
        
      deactivate();
      onClose();
    }


    function handleInputPrice(valueAsString: string, valueAsNumber: number) {
        setInputPrice(valueAsString);
      }

    function handleCloseWindow() {
        setInputPrice("");
        onClose(false);
    }
    

    const startPayment = async ({ether, addr }:Props1) => {
        
         var flag=false;
          if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");
      
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          ethers.utils.getAddress(addr);
          const tx = await signer.sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(ether)
          });
          flag=true;
          console.log({ ether, addr });
          console.log("tx", tx);

          return flag;
      };

    async function handleBuyIgnot ()
    {
       // const _price = parseInt(inputPrice);
        const _number = parseInt(numberBlock);

        const perem=await startPayment({
            ether: priceBlock,
            addr: addressBlock
          });
        if (inputPrice&&perem) {
            BuyIgnot(_number, inputPrice);
            onClose(false);
            setInputPrice("");
        }
    }
  return (
    <Modal isOpen={isOpen} onClose={handleCloseWindow} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Add gold bar 
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
    
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
             
              <Text
                color="white"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Input price more or  current price:
              </Text>
              
            </Flex>      
            <NumberInput
                mb={2}
                //min={1}
                value={inputPrice}
                onChange={handleInputPrice}
                color="white"
                clampValueOnBlur={false}
                >
                <NumberInputField />
            </NumberInput>

              </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb={3}  marginLeft="100px">
            
            <Button colorScheme="teal" size="lg" onClick={handleBuyIgnot}  >
                Buy
            </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

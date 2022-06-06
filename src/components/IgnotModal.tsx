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
  import { useRegStatus, useContractMethod } from "../hooks";

  type Props = {
    isOpen: any;
    onClose: any;
  };
  
  export default function IgnotModal({ isOpen, onClose }: Props) {
    const { account, deactivate } = useEthers();
    const [inputPrice, setInputPrice] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const { state, send: addNewIgnot } = useContractMethod("newIgnot");
    function handleDeactivateAccount() {
        
      deactivate();
      onClose();
    }


    function handleInputPrice(valueAsString: string, valueAsNumber: number) {
        setInputPrice(valueAsString);
      }

    function handleCloseWindow() {
        setInputDesc("");
        setInputPrice("");
        onClose(false);
    }

    function handleAddNewIgnot()
    {
        //const _price = parse(inputPrice);
        const _desc = inputDesc;
        if (inputPrice) {
            addNewIgnot(inputPrice,_desc);
            onClose(false);
            setInputDesc("");
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
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Input info about bar
              </Text>
              
            </Flex>
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
                Input price of your gold bar: 
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

            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Input description of your gold bar:
              </Text>
              
            </Flex>      
            <Input value={inputDesc} onChange={e => {setInputDesc(e.target.value)}} type="text"/>
                
            
            
              </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb={3}  marginLeft="100px">
            <Button colorScheme="teal" size="lg" onClick={handleAddNewIgnot}  >
                Add
            </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

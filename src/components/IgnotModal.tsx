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
    const [inputWeight, setInputWeight] = useState("");
    const [inputCert, setInputCert] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const { state, send: addNewIgnot } = useContractMethod("newIgnot");
    function handleDeactivateAccount() {
        
      deactivate();
      onClose();
    }


    function handleInputPrice(valueAsString: string, valueAsNumber: number) {
        setInputWeight(valueAsString);
      }

    function handleCloseWindow() {
        setInputDesc("");
        setInputWeight("");
        setInputCert("");
        onClose(false);
    }

    function handleAddNewIgnot()
    {
        //const _price = parse(inputWeight);
        const _desc = inputDesc;
        const _cert=inputCert;
        if (inputWeight) {
            addNewIgnot(inputWeight,_cert,_desc);
            onClose(false);
            setInputDesc("");
            setInputWeight("");
            setInputCert("");

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
                Input weight of your gold bar: 
              </Text>
              
            </Flex>      
            <NumberInput
                mb={2}
                //min={1}
                value={inputWeight}
                onChange={handleInputPrice}
                color="white"
                clampValueOnBlur={false}
                >
                <NumberInputField />
            </NumberInput>
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                  Input number certificate of your gold bar:
                </Text>   
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
            <Input value={inputCert} onChange={e => {setInputCert(e.target.value)}} type="text"/>
            </Flex>
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
